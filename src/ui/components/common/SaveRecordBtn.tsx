import { FC } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { Button } from "react-bootstrap";
import { formatDate } from "../utils/getFile";

const SaveRecordBtn: FC = () => {
    const currentSession = useSelector<StoreType, number | null>(({ SessionState }) => SessionState.currentSession);
    const url = useSelector<StoreType, string>(({ SessionState }) => {
        const index = currentSession === null ? SessionState.sessionData.length - 1 : currentSession;

        return SessionState.sessionData?.[index]?.recordUrl || "";
    });
    const disabled = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.disableCreateIssue);

    const ext = url.slice(url.indexOf("/") + 1, url.indexOf(";"));

    const fileName = `record${formatDate(Date.now())}.${ext}`;

    return (
        <Button
            id="SaveRecordBtn"
            className="btn-black px-3"
            variant="dark"
            size="sm"
            title="Запись доступна только после остановки сессии"
            disabled={disabled}
        >
            <a
                id="SaveRecord"
                className="text-decoration-none text-reset"
                href={url}
                download={fileName}
                aria-keyshortcuts="Shift+R"
            >
                Скачать запись
            </a>
        </Button>
    );
};

export default SaveRecordBtn;
