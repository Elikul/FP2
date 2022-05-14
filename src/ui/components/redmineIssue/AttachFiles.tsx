import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { attachFiles, removeAllAttachments, removeAttachmentFiles } from "../../actions/issueAction";
import { StoreType } from "../../reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import RViewerJS from "viewerjs-react";
import BufferImage from "./BufferImage";
import { toast } from "react-toastify";
import { alertOptions } from "../../../Redmine/utilsRedmine";
import SRC_DOC_IMG from "../../../../resources/doc_img.jpg";

export type AttachFilesType = {
    file: File;
    src: string;
};

const AttachFiles: FC = () => {
    const issueAttachments = useSelector<StoreType, AttachFilesType[]>(({ IssueState }) => IssueState.attachments);
    const [isDisable, setDisable] = useState<boolean>(true);

    const dispatch = useDispatch();

    const DelConfirmMsg = ({ closeToast }) => (
        <div>
            <h4>Вы уверены?</h4>
            <div>
                <Button className="btn-warning" onClick={OperationDeleteHandlers}>
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
        setDisable(issueAttachments.length === 0);
    }, [issueAttachments]);

    const dispatchFiles = (files: File[]) => {
        files.forEach(file => {
            if (!file.type.includes("image")) {
                dispatch(
                    attachFiles({
                        file: file,
                        src: SRC_DOC_IMG
                    })
                );

                return;
            }

            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                dispatch(
                    attachFiles({
                        file: file,
                        src: reader.result as string
                    })
                );
            };
        });
    };

    const handleInputFiles = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            let files: File[] = Array.from(e.target.files);
            dispatchFiles(files);
        }
    };

    const onDeleteHandler = (delFileName: string) => {
        let newAttachments = issueAttachments?.filter(fileInfo => fileInfo.file.name !== delFileName);
        dispatch(removeAttachmentFiles(newAttachments));
    };

    const OperationDeleteHandlers = () => {
        dispatch(removeAllAttachments());
        setDisable(true);
    };

    return (
        <Form.Group>
            <InputGroup className="mb-0">
                <Form.Control type="file" onChange={handleInputFiles} name="file[]" multiple />
            </InputGroup>
            <h6 className="d-flex align-items-center justify-content-center">
                Дополнительные файлы к задаче - {issueAttachments.length}
                <Button variant="link" className="ms-5 text-warning" onClick={confirmDel} disabled={isDisable}>
                    Удалить все
                </Button>
                <BufferImage />
            </h6>
            <RViewerJS className="d-flex flex-row flex-wrap justify-content-center align-items-center">
                {issueAttachments.map((fileInfo, index) => (
                    <div key={fileInfo.file.name} className="position-relative m-1 img-size">
                        <Image
                            className="w-100"
                            src={fileInfo.src}
                            alt={fileInfo.file.name}
                            title={fileInfo.file.name}
                            data-testid={`file${index}`}
                        />
                        <Button
                            className="btn-position btn-sm btn-light btn-opacity btn-img-scale"
                            onClick={() => onDeleteHandler(fileInfo.file.name)}
                            data-testid={`delete-file${index}`}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                    </div>
                ))}
            </RViewerJS>
        </Form.Group>
    );
};

export default AttachFiles;
