import { FC, memo } from "react";
import { Button } from "react-bootstrap";
import sendMessagePopup from "../utils/sendMessagePopup";
import { MessageAgentType } from "../../agent/utils/MessageAgentTypes";
import { hideTable } from "../actions/popupAction";
import { useDispatch } from "react-redux";

const RecordBtn: FC = () => {
    const dispatch = useDispatch();

    const handleStartVideo = async () => {
        dispatch(hideTable(true));
        await sendMessagePopup({ type: MessageAgentType.addRecWindow });
    };

    return (
        <Button variant="link" onClick={handleStartVideo}>
            Записать видео
        </Button>
    );
};

export default memo(RecordBtn);
