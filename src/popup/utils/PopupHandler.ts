import { Dispatch } from "redux";
import { HandlerMessagePopupType, MessagePopupType } from "./MessagePopupTypes";
import { connectPopup, hideTable, setLoading } from "../actions/popupAction";
import { parseVersionResponse } from "./setTableData";
import { popupPort } from "..";

type SetTextType = (data: { url: string; text: string }) => void;

type HandlerFunctions = VoidFunction | SetTextType;

/**
 * agent -> content-script.js -> background.ts -> ** popup **
 */
class PopupHandler {
    dispatch: Dispatch;

    /**
     * Обработка поступающих сообщений в Popup
     */
    handlers: Record<MessagePopupType, HandlerFunctions> = {
        /**
         * Agent и Popup соединились
         */
        [MessagePopupType.connectPopup]: () => {
            this.dispatch(connectPopup());
        },
        /**
         * Заполнить табличку с версиями проектов
         * @param data - данные о версиях проектов, используемых в приложении
         */
        [MessagePopupType.setText]: (data: { url: string; text: string }) => {
            if (data.url.includes("version")) {
                this.dispatch(hideTable(false));
                parseVersionResponse(data.text);
            }
            this.dispatch(setLoading(false));
        }
    };

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
        popupPort.onMessage.addListener((msg: HandlerMessagePopupType) => {
            this.handleMessage(msg);
        });
    }

    /**
     * Обработка входящих сообщений
     * @param message - входящее сообщение
     */
    handleMessage = (message: HandlerMessagePopupType) => {
        const handler: Function = this.handlers[message.name];
        if (!handler) {
            console.warn("ОШИБКА: не найден обработчик для пришедшего сообщения " + message.name);
            return;
        }

        handler(message.data);
    };
}

export default PopupHandler;
