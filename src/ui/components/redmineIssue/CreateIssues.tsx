import { Button, Modal } from "react-bootstrap";
import { Fragment, FC, useEffect, useState } from "react";
import FormIssue from "./FormIssue";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import {
    removeAllAttachments,
    removeAllScreenshots,
    setGif,
    setLink,
    setRedmineProject,
    setVideo,
    showModalCreateIssue,
    withGif,
    withVideo
} from "../../actions/issueAction";
import { formatDate, getFile } from "../utils/getFile";

const CreateIssues: FC = () => {
    const [show, setShow] = useState(false);

    const stateShow = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.showModalCreateIssue);
    const disabled = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.disableCreateIssue);
    const currentSession = useSelector<StoreType, number | null>(({ SessionState }) => SessionState.currentSession);
    const record = useSelector<StoreType, { url: string; date: number }>(({ SessionState }) => {
        const index = currentSession === null ? SessionState.sessionData.length - 1 : currentSession;

        return {
            url: SessionState.sessionData?.[index]?.recordUrl,
            date: SessionState.sessionData?.[index]?.dateOfEnd
        };
    });

    const dispatch = useDispatch();

    useEffect(() => setShow(stateShow), [stateShow]);

    const handleClose = () => {
        dispatch(showModalCreateIssue(false));
        dispatch(setRedmineProject(null));
        dispatch(setLink(""));
        dispatch(removeAllAttachments());
        dispatch(removeAllScreenshots());
    };

    const handleShow = async () => {
        const dateTime = formatDate(record.date);
        dispatch(showModalCreateIssue(true));
        if (record.url.includes("image/gif")) {
            let gifFile = await getFile(record.url, `record${dateTime}.gif`, "image/gif");
            dispatch(setGif(gifFile));
            dispatch(withVideo(false));
            dispatch(withGif(true));
            return;
        }
        let videoFile = await getFile(record.url, `record${dateTime}.webm`, "video/webm");
        dispatch(setVideo(videoFile));
        dispatch(withVideo(true));
        dispatch(withGif(false));
    };

    return (
        <Fragment>
            <Button
                id="CreateIssue"
                className="btn-black px-3"
                title="Чтобы создать задачу остановите генерацию по кнопке стоп"
                variant="dark"
                size="sm"
                data-testid="btn-open-task-window"
                onClick={handleShow}
                disabled={disabled}
                aria-keyshortcuts="Alt+Z"
            >
                Создать задачу в Redmine
            </Button>
            <Modal id="ModalIssue" size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Задача</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormIssue />
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default CreateIssues;
