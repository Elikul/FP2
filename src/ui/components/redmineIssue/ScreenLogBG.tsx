import { Fragment, FC, memo, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeAllScreenshots, showLog, showScreenshots, loadScreenshot } from "../../actions/issueAction";
import sendMessageAgentHandler from "../../util/inspectWindow/sendMessageAgentHandler";
import { StoreType } from "../../reducers";
import { InfoScreenshot } from "../../../indexedDB/indexeddb";
import { MessageAgentType } from "../../../agent/utils/MessageAgentTypes";
import { toast } from "react-toastify";
import { alertOptions } from "../../../Redmine/utilsRedmine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

const ScreenLogBG: FC = () => {
    const screenshots = useSelector<StoreType, InfoScreenshot[]>(({ IssueState }) => IssueState.screenshots);
    const isOpenScreenshots = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateOpenScreenshot);
    const isOpenLog = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateOpenLog);
    const [isDisable, setDisable] = useState<boolean>(true);
    const target = useRef(null);
    const isLoading = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.isLoadScreenshot);

    const dispatch = useDispatch();

    const DelConfirmMsg = ({ closeToast }) => (
        <div>
            <h4>Вы уверены?</h4>
            <div>
                <Button className="btn-warning" onClick={onDeleteHandler}>
                    Да, удалить все!
                </Button>
                <Button className="btn-light" onClick={closeToast}>
                    Отмена
                </Button>
            </div>
        </div>
    );

    const confirmDel = () => {
        toast.warn(DelConfirmMsg, alertOptions);
    };

    useEffect(() => {
        setDisable(screenshots.length === 0);
    }, [screenshots]);

    const onDeleteHandler = () => {
        dispatch(removeAllScreenshots());
        setDisable(true);
    };

    const createScreenshot = () => {
        dispatch(loadScreenshot(true));
        sendMessageAgentHandler({ type: MessageAgentType.makeScreenshot });
    };

    return (
        <Fragment>
            <ButtonGroup className="d-flex align-self-center mb-2">
                <Button
                    className="btn-secondary"
                    title="Создать скриншот текущего состояния приложения"
                    ref={target}
                    onClick={createScreenshot}
                >
                    Создать скриншот приложения {isLoading && <FontAwesomeIcon icon={faSpinner} />}
                </Button>
                <DropdownButton
                    variant="secondary"
                    as={ButtonGroup}
                    title={`Cкриншоты (${screenshots.length})`}
                    data-testid="open-screenshots"
                >
                    <Dropdown.Item
                        eventKey="1"
                        title={(isOpenScreenshots ? "Скрыть" : "Посмотреть") + " все скриншоты"}
                        onClick={() => dispatch(showScreenshots(!isOpenScreenshots))}
                        aria-expanded={isOpenScreenshots}
                        disabled={isDisable}
                    >
                        {isOpenScreenshots ? "Скрыть" : "Посмотреть"}
                    </Dropdown.Item>
                    <Dropdown.Item
                        eventKey="2"
                        className="text-warning"
                        title="Удалить все скриншоты"
                        onClick={confirmDel}
                        disabled={isDisable}
                    >
                        Удалить все
                    </Dropdown.Item>
                </DropdownButton>
                <Button
                    className="btn-secondary"
                    onClick={() => {
                        dispatch(showLog(!isOpenLog));
                    }}
                    aria-expanded={isOpenLog}
                    data-testid="see-log"
                >
                    {isOpenLog ? "Скрыть" : "Посмотреть"} лог
                </Button>
            </ButtonGroup>
        </Fragment>
    );
};

export default memo(ScreenLogBG);
