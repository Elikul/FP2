import { FC, Fragment, useState, KeyboardEvent } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { RedmineAPI } from "../../Redmine/RedmineAPI";
import { hideTable } from "../actions/popupAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { getApikeyRedmine } from "./GetApikeyRedmine";
import sendMessagePopup from "../utils/sendMessagePopup";
import { MessageAgentType } from "../../agent/utils/MessageAgentTypes";
import { toast } from "react-toastify";

/**
 * Получить лог выбранной задачи
 * @constructor
 */
const ReproduceLogBtn: FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const showInput = () => {
        getApikeyRedmine(); //проверка есть ли ключ api пользователя
        if (!show) {
            dispatch(hideTable(true));
            setShow(true);
            return;
        }
        setShow(false);
    };

    const getLog = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setShow(false);
            setLoading(true);
            RedmineAPI.getIssueLog(e.target?.value).then(async log => {
                setLoading(false);
                setShow(true);

                if (!log) return;

                if (log?.length === 0) {
                    toast.error("К данной задаче не прикреплён лог");
                    return;
                }

                await sendMessagePopup({ type: MessageAgentType.reproduceLog, payload: log });
            });
        }
    };

    return (
        <Fragment>
            <Button variant="link" onClick={showInput}>
                Воспроизвести лог {isLoading && <FontAwesomeIcon icon={faSpinner} />}
            </Button>
            {show && (
                <InputGroup>
                    <InputGroup.Text>#</InputGroup.Text>
                    <FormControl placeholder="Номер задачи..." onKeyDown={getLog} />
                </InputGroup>
            )}
        </Fragment>
    );
};

export default ReproduceLogBtn;
