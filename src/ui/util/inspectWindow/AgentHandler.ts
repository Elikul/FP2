import { clearStore, connectSuccess } from "../../actions/mainAction";
import port from "./port";
import { Dispatch } from "redux";
import { InfoScreenshot, IUserActionType } from "../../../indexedDB/indexeddb";
import GeneratingCode from "../../analysis/GeneratingCode";
import dayjs from "dayjs";
import { setSessionByKey } from "../../actions/sessionAction";
import { getApiKey, loadScreenshot, setScreenshots } from "../../actions/issueAction";
import { HandlerMessageAgentHandlerType, MessageAgentHandlerType } from "./MessageHandlerTypes";
import { alertOptions } from "../../../Redmine/utilsRedmine";
import { toast } from "react-toastify";
import { injectDebugger } from "./injectDebugger";
import { filterSessionLog } from "../filterSessionLog";

type SetDateFType = (date: number) => void;
type AttachFType = (screenshots: InfoScreenshot[]) => void;
type SetUserDataFType = (data: IUserActionType[]) => void;
type AddScreenshotFType = (screenshot: InfoScreenshot) => void;
type SetRecord = (url: string) => void;

type HandlerFunctions = VoidFunction | SetDateFType | AttachFType | SetUserDataFType | AddScreenshotFType | SetRecord;

/**
 * agent -> content-script.js -> background.ts -> **dev tools**
 */
class AgentHandler {
    dispatch: Dispatch;

    startDate: number = 0;
    stopDate: number = 0;
    sessionScreenshots: InfoScreenshot[] = [];
    recordUrl: string = "";

    /**
     * Обработка сообщений приходящих от Agent в Devtools
     */
    handlers: Record<MessageAgentHandlerType, HandlerFunctions> = {
        /**
         * Успешное соединение Agent и Devtools
         */
        [MessageAgentHandlerType.connectExtension]: () => {
            this.dispatch(connectSuccess());
        },

        /**
         * Начать сессию
         * @param date - дата старта
         */
        [MessageAgentHandlerType.startSession]: (date: number) => {
            this.startDate = date;
        },

        /**
         * Закончить сессию
         * @param date - дата окончания
         */
        [MessageAgentHandlerType.stopSession]: (date: number) => {
            this.stopDate = date;
        },

        /**
         * Получить скриншоты сессии
         * @param screenshots - скриншоты сессии
         */
        [MessageAgentHandlerType.attachSessionScreenshots]: (screenshots: InfoScreenshot[]) => {
            this.sessionScreenshots = screenshots;
        },

        /**
         * Получить url записи
         * @param url - url записи видео/гиф
         */
        [MessageAgentHandlerType.setRecordUrl]: (url: string) => {
            this.recordUrl = url;
        },

        /**
         * Сформировать информацию о сессии
         */
        [MessageAgentHandlerType.setUserData]: (data: IUserActionType[]) => {
            data = filterSessionLog(data);
            this.dispatch(
                setSessionByKey({
                    dateOfStart: this.startDate,
                    dateOfEnd: this.stopDate,
                    title: dayjs(this.stopDate).format("DD-MM-YYYY HH:mm:ss"),
                    generatedCode: GeneratingCode.toGenerateTestTemplate(data),
                    log: data,
                    screenshots: this.sessionScreenshots,
                    recordUrl: this.recordUrl
                })
            );
        },

        /***
         * Прикрепить созданный скриншот к задаче
         * @param screenshot - скриншот
         */
        [MessageAgentHandlerType.addScreenshot]: (screenshot: InfoScreenshot) => {
            this.dispatch(setScreenshots(screenshot));
            this.dispatch(loadScreenshot(false));
            toast.info("Скриншот создан!", alertOptions);
        },

        /**
         * Перезагрузить расширение в Devtools
         */
        [MessageAgentHandlerType.reloaded]: async () => {
            this.dispatch(clearStore());
            this.dispatch(getApiKey());
            await injectDebugger();
        }
    };

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
        port.onMessage.addListener((msg: HandlerMessageAgentHandlerType) => {
            this.handleMessage(msg);
        });
    }

    /**
     * Обработка входящих сообщений Popup
     * @param message - сообщение от Agent
     */
    handleMessage = (message: HandlerMessageAgentHandlerType) => {
        const handler: Function = this.handlers[message.name];
        if (!handler) {
            console.warn("ОШИБКА: не найден обработчик для пришедшего сообщения " + message.name);
            return;
        }

        handler(message.data);
    };
}

export default AgentHandler;
