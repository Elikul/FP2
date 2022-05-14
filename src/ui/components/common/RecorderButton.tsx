import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSession, setStartSession, setStopSession } from "../../actions/sessionAction";
import sendMessageAgentHandler from "../../util/inspectWindow/sendMessageAgentHandler";
import { disableCreateIssue, withGif, withVideo } from "../../actions/issueAction";
import { MessageAgentType } from "../../../agent/utils/MessageAgentTypes";
import { StoreType } from "../../reducers";
import { setLoading } from "../../actions/mainAction";
import { ISessionData } from "../../../indexedDB/indexeddb";

enum FormatType {
    video = "video",
    gif = "gif"
}

const RecorderButton: FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector<StoreType, boolean>(({ MainState }) => MainState.isLoading);

    const generateStartDate = useSelector<StoreType, number>(({ SessionState }) => SessionState.startSessionDate);
    const generateStopDate = useSelector<StoreType, number>(({ SessionState }) => SessionState.stopSessionDate);
    const session = useSelector<StoreType, ISessionData | undefined>(({ SessionState }) => {
        const index = SessionState.sessionData.length - 1;

        if (!SessionState.sessionData.length) {
            return;
        }

        return SessionState.sessionData[index];
    });
    const isGif = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateWithGif);

    const switcher = (format: FormatType) => {
        if (isLoading) {
            document.body.classList.add("wait-data");
            setTimeout(stopSession, 2000);
            return;
        }
        startSession(format);
    };

    const startSession = (format: FormatType) => {
        dispatch(setLoading(true));
        dispatch(disableCreateIssue(true));
        dispatch(setStartSession());
        sendMessageAgentHandler({ type: MessageAgentType.clearData });
        dispatch(createSession());

        if (format === FormatType.gif) {
            sendMessageAgentHandler({ type: MessageAgentType.startGif });
            dispatch(withGif(true));
            dispatch(withVideo(false));
            return;
        }
        sendMessageAgentHandler({ type: MessageAgentType.startVideo });
        dispatch(withVideo(true));
        dispatch(withGif(false));
    };

    const stopSession = () => {
        dispatch(setLoading(false));
        if (isGif) {
            sendMessageAgentHandler({ type: MessageAgentType.stopGif });
        } else {
            sendMessageAgentHandler({ type: MessageAgentType.stopVideo });
        }
        dispatch(disableCreateIssue(false));
        dispatch(setStopSession());
    };

    useEffect(() => {
        if (generateStopDate === 0) return;
        sendMessageAgentHandler({ type: MessageAgentType.getData, payload: [generateStartDate, generateStopDate] });
    }, [generateStopDate]);

    useEffect(() => {
        if (session === undefined) return;
        sendMessageAgentHandler({ type: MessageAgentType.saveSession, payload: session });
    }, [session]);

    return (
        <Dropdown as={ButtonGroup} className="px-3">
            <Button
                id="RecordBtn"
                className="btn-black"
                title={isLoading ? "Закончить формирование лога" : "Начать формирование лога"}
                variant="dark"
                size="sm"
                data-testid={isLoading ? "btn-stop" : "btn-start"}
                onClick={() => switcher(FormatType.video)}
                aria-keyshortcuts="Alt+S"
            >
                {isLoading ? "Cтоп" : "Старт"} <FontAwesomeIcon icon={isLoading ? faStop : faPlay} size="sm" />
            </Button>

            <Dropdown.Toggle split variant="dark" id="Menu" data-testid="dropdown-menu" size="sm" />

            <Dropdown.Menu>
                <Dropdown.Item
                    id="GifBtn"
                    onClick={() => switcher(FormatType.gif)}
                    data-testid={isLoading ? "btn-stop" : "btn-start-gif"}
                    aria-keyshortcuts="Alt+G"
                >
                    Запись с гифкой
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default RecorderButton;
