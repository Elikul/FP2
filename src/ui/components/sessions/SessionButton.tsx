import { FC, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentSession } from "../../actions/sessionAction";

interface ISessionButtonProps {
    titleBtn: string;
    index: number;
}

const SessionButton: FC<ISessionButtonProps> = ({ titleBtn, index }) => {
    const dispatch = useDispatch();

    const handler = useCallback(() => {
        dispatch(setCurrentSession(index));
    }, []);
    return (
        <Button
            className="switch-session btn-black mt-2 mb-2 w-75"
            variant="outline-dark"
            size="lg"
            onClick={handler}
            aria-keyshortcuts="Shift+S"
        >
            {titleBtn}
        </Button>
    );
};

export default SessionButton;
