import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideTable, setCurPopupBtn, setLoading } from "../actions/popupAction";
import { StorePopupType } from "../reducers";
import sendMessagePopup from "../utils/sendMessagePopup";
import { MessageAgentType } from "../../agent/utils/MessageAgentTypes";
import RecordBtn from "./RecordBtn";
import ReproduceLogBtn from "./ReproduceLogBtn";

export enum MenuTitles {
    versions = "testing/version",
    refresh = "Refresh",
    recombine = "Recombine",
    dropcache = "Dropcache"
}

enum UrlResources {
    versions = "testing/version",
    refresh = "application/resources/control.utils?refresh",
    recombine = "application/resources/control.utils?recombine",
    dropcache = "application/resources/control.utils?dropcache"
}

const Menu: FC = () => {
    const names = Object.values(MenuTitles);
    const resources = Object.values(UrlResources).map((url, i) => ({ name: names[i], url: url }));

    const isLoading = useSelector<StorePopupType, boolean>(({ PopupState }) => PopupState.isLoading);
    const curBtn = useSelector<StorePopupType, number>(({ PopupState }) => PopupState.curBtn);

    const dispatch = useDispatch();

    const handlerMenu = async (index: number, value: UrlResources) => {
        dispatch(hideTable(true));
        dispatch(setCurPopupBtn(index));
        dispatch(setLoading(true));
        await sendMessagePopup({ type: MessageAgentType.followResPage, payload: value });
    };

    return (
        <div className="d-flex flex-column flex-nowrap justify-content-center  align-items-stretch text-center">
            <h6>Ресурсы</h6>
            {resources.map((el, index) => (
                <Button key={index} variant="link" onClick={() => handlerMenu(index, el.url)} data-testid={el.name}>
                    {el.name} {curBtn === index && <FontAwesomeIcon icon={isLoading ? faSpinner : faCheck} />}
                </Button>
            ))}
            <RecordBtn />
            <ReproduceLogBtn />
        </div>
    );
};

export default memo(Menu);
