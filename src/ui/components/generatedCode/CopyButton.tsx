import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo } from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { toast } from "react-toastify";
import { alertOptions } from "../../../Redmine/utilsRedmine";
import ClipboardJS from "clipboard";

const CopyButton: FC = () => {
    let clipboard = new ClipboardJS(".btn-copy-code");

    clipboard.on("success", () => {
        toast.info("Скопировано в буфер обмена!", { ...alertOptions, autoClose: 5000 });
    });

    clipboard.on("error", () => {
        toast.error("Произошла ошибка копирования!", { ...alertOptions, autoClose: 5000 });
    });

    return (
        <Button
            id="CopyBtn"
            className="btn-black btn-copy-code px-3"
            title="Скопировать код"
            variant="dark"
            size="sm"
            data-clipboard-action="copy"
            data-clipboard-target="#code-text"
            data-testid="CopyButton"
            aria-keyshortcuts="Alt+C"
        >
            <FontAwesomeIcon icon={faCopy} size="sm" />
        </Button>
    );
};

export default memo(CopyButton);
