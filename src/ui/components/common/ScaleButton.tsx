import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons/faExpandAlt";
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons/faCompressAlt";
import { FC, useState } from "react";
import { Behaviour, compressCodeBlock, compressLogBlock, expandCodeBlock, expandLogBlock } from "../utils/scaleWindow";

interface ButtonScaleProps {
    behaviour: Behaviour;
}

const ScaleButton: FC<ButtonScaleProps> = props => {
    const [isExpand, setExpand] = useState<boolean>(true);

    const onClickScaleBtn = () => {
        let block1: HTMLElement | null = document.getElementById("block1");
        let block2: HTMLElement | null = document.getElementById("block2");
        let session_block: HTMLElement | null = document.getElementById("session-block");
        let log_block: HTMLElement | null = document.getElementById("log-table-block");
        let scaleCodeBtn: HTMLElement | null = document.getElementById("codeS");

        if (isExpand) {
            if (props.behaviour === Behaviour.codeS) {
                expandCodeBlock(block1, block2, session_block, log_block);
            } else if (props.behaviour === Behaviour.logS) {
                expandLogBlock(block1, block2, session_block, log_block, scaleCodeBtn);
            }

            setExpand(false);
            return;
        }

        if (props.behaviour === Behaviour.codeS) {
            compressCodeBlock(block1, block2, session_block, log_block);
        } else if (props.behaviour === Behaviour.logS) {
            compressLogBlock(block1, block2, session_block, log_block, scaleCodeBtn);
        }

        setExpand(true);
    };

    return (
        <Button
            id={props.behaviour}
            className="btn-black btn-scale"
            title="Масштабировать"
            variant="dark"
            size="sm"
            data-testid={props.behaviour}
            onClick={onClickScaleBtn}
            aria-keyshortcuts="Shifr+L/K"
        >
            <FontAwesomeIcon icon={isExpand ? faExpandAlt : faCompressAlt} size="sm" />
        </Button>
    );
};

export default ScaleButton;
