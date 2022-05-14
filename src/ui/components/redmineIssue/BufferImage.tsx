import { Button, Modal } from "react-bootstrap";
import { Fragment, FC, useState, ClipboardEvent } from "react";
import { useDispatch } from "react-redux";
import { attachFiles } from "../../actions/issueAction";

const BufferImage: FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    const dispatch = useDispatch();

    const addImage = (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        let items = event.clipboardData.items;
        let blob = Array.from(items)
            .find(item => item.type.startsWith("image"))
            ?.getAsFile();

        if (!blob) return;
        let reader = new FileReader();
        reader.onload = function() {
            dispatch(
                attachFiles({
                    file: blob as File,
                    src: reader.result as string
                })
            );
        };
        reader.readAsDataURL(blob);
    };

    return (
        <Fragment>
            <Button variant="link" title="Добавить изображение из буфера обмена" onClick={handleShow}>
                Добавить изображение из буфера
            </Button>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавьте изображение из буфера обмена</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-row align-items-center">
                    <div>
                        Используйте клавишу PrintScreen или скопируйте (Ctrl+C) любое другое изображение, а затем
                        комбинацию Ctrl+V
                    </div>
                    <div onPaste={addImage} className="style-ins-area d-flex justify-content-center align-items-center">
                        Ctrl+V
                    </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
};

export default BufferImage;
