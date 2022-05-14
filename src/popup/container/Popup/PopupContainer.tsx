import { useDispatch, useSelector } from "react-redux";
import Menu from "../../components/Menu";
import TableOfVersions from "../../components/TableOfVersions";
import { StorePopupType } from "../../reducers";
import { useEffect } from "react";
import PopupHandler from "../../utils/PopupHandler";
import { ToastContainer } from "react-toastify";

const PopupComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        new PopupHandler(dispatch); //Инициализация агента общения со страницей
    }, []);

    const isHide = useSelector<StorePopupType, boolean>(({ PopupState }) => PopupState.hideTable);

    return (
        <div>
            <ToastContainer />
            <div className="d-flex flex-row menu-size">
                <Menu />
                {!isHide && <TableOfVersions />}
            </div>
        </div>
    );
};

export default PopupComponent;
