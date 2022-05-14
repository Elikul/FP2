import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import PopupComponent from "./container/Popup/PopupContainer";
import configureStore from "./store/configureStore";
import "./style/popup.less";
import { injectPopupDebugger } from "./utils/injectDebugger";
import { getPort } from "./utils/portPopup";

export const PopupContainer = () => {
    return (
        <Provider store={configureStore({})}>
            <PopupComponent />
        </Provider>
    );
};

export let popupPort;

/**
 * Отрисовка Popup
 */
window.addEventListener("load", async () => {
    //порт соединения страницы с Popup
    popupPort = await getPort();
    await injectPopupDebugger();

    ReactDOM.render(<PopupContainer />, document.getElementById("popup"));
});
