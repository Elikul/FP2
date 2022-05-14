import {
    clearStore,
    getsDataFromDB,
    InfoScreenshot,
    ISessionData,
    IUserActionType,
    saveDataInIDB,
    StoreName,
    initIndexedDB,
    createObjectStore
} from "../indexedDB/indexeddb";
import { checkEventChange, Types } from "./utils/forDefineUIComponents";
import sendMessageAgent from "./utils/sendMessageAgent";
import { MessageAgentHandlerType } from "../ui/util/inspectWindow/MessageHandlerTypes";
import { HandlerMessageAgentType, MessageAgentType } from "./utils/MessageAgentTypes";
import { addToastContainer, isSecureContext, PermissionMode, permitVideoOrGif } from "./components/PermitVideoOrGif";
import html2canvas from "html2canvas";
import { MessagePopupType } from "../popup/utils/MessagePopupTypes";
import { setRecordWindow } from "./components/RecordWindowPopup";
import { MediaRecorderApi } from "./utils/Video_Screenshots_Gif";
import { onMessage } from "./utils/uiMessageHandler";
import {
    Components,
    findBigButton,
    findCheckBox,
    findCombobox,
    findDatePicker,
    findFilter,
    findGridCell,
    findGridToolbar,
    findModalWindow,
    findQuickFilter,
    findTabContainer
} from "./utils/findComponents";
import { formLog, formLogFromCoreAnalytics } from "./utils/formLog";
import { toReproduceLog } from "./reproduceLog/reproduceLog";

let formName: string;
let tabActive: string | undefined;
let tabContainer: string | null;
let formsPathNavigator: string = "";
let isConsolidation: boolean = false;

type getDataFType = (borders: [number, number]) => void;
type saveSessionFType = (data: ISessionData) => void;
type followLinkFType = (link: string) => void;
type stopType = (isSend: boolean) => void;
type reproduceType = (log: IUserActionType[]) => void;

type handlerFunctions = VoidFunction | getDataFType | saveSessionFType | followLinkFType | stopType | reproduceType;

/**класс Agent**/
export default class Agent {
    private static window: Window;
    public static handlers: Record<MessageAgentType, handlerFunctions>;

    constructor(w: Window) {
        Agent.window = w;
        console.log("Agent constructor (w) >> ", w);

        //Проверка является подключение к странице безопасным
        const context: boolean = isSecureContext();

        /**
         * Обработка поступающих сообщений на страницу Agent
         */
        Agent.handlers = {
            /**
             * Devtools соединился с Agent
             */
            [MessageAgentType.connectAgent]: async () => {
                console.log("Browser connect handler -> connected");
                sendMessageAgent({ type: MessageAgentHandlerType.connectExtension });
                Agent.attachSelectClickHandler();
                Agent.getDataFromLogger();
                addToastContainer();
                await initIndexedDB();
            },

            /**
             * Popup cоединился с Agent
             */
            [MessageAgentType.connectAgPopup]: async () => {
                console.log("Browser connect popup -> connected");
                sendMessageAgent({ type: MessagePopupType.connectPopup });
                addToastContainer();
                await createObjectStore(StoreName.video);
            },

            /**
             * Отключить прослушивание сообщений после отключения порта
             */
            [MessageAgentType.disconnect]: () => {
                window.removeEventListener("message", onMessage);
            },

            /**
             * Получить лог пользовательских действий и их скриншотов из IndexedDB
             */
            [MessageAgentType.getData]: async (borders: [number, number]) => {
                //отправить начальную дату сессии
                sendMessageAgent({ type: MessageAgentHandlerType.startSession, payload: borders[0] });
                //отправить конечную дату сессии
                sendMessageAgent({ type: MessageAgentHandlerType.stopSession, payload: borders[1] });

                let listCode: IUserActionType[] = <IUserActionType[]>await getsDataFromDB(StoreName.logActions);
                let screenshotsSession: InfoScreenshot[] = <InfoScreenshot[]>(
                    await getsDataFromDB(StoreName.screenshots)
                );

                const [from, to] = borders;
                listCode = listCode.filter(value => from <= value.date && value.date <= to);
                screenshotsSession = screenshotsSession.filter(value => from <= value.date && value.date <= to);

                sendMessageAgent({
                    type: MessageAgentHandlerType.attachSessionScreenshots,
                    payload: screenshotsSession
                });
                sendMessageAgent({ type: MessageAgentHandlerType.setUserData, payload: listCode });
            },

            /**
             * Очистить данные в БД
             */
            [MessageAgentType.clearData]: async () => {
                await clearStore(StoreName.logActions);
            },

            /**
             *  Сохранить сессию в IndexedDB
             */
            [MessageAgentType.saveSession]: async (sessionsData: ISessionData) => {
                if (sessionsData.title === "Текущая") return;
                await saveDataInIDB(StoreName.sessionsData, sessionsData);
            },

            /**
             * Сделать скриншот текущего состояния приложения
             */
            [MessageAgentType.makeScreenshot]: async () => {
                const canvas = await html2canvas(Agent.window.document.body);
                const frame = canvas.toDataURL("image/png", 1.0);

                const img: InfoScreenshot = {
                    date: Date.now(),
                    screenshot: frame
                };
                sendMessageAgent({ type: MessageAgentHandlerType.addScreenshot, payload: img });
            },

            /**
             * Открыть в новой вкладке созданную задачу в Redmine
             */
            [MessageAgentType.followLink]: window.open,

            /**
             * Начать захват экрана для записи видео
             */
            [MessageAgentType.startVideo]: () => {
                if (!context) return;
                permitVideoOrGif(PermissionMode.video);
            },

            /**
             * Закончить запись видео
             */
            [MessageAgentType.stopVideo]: () => {
                if (!context) return;
                MediaRecorderApi.stopVideo();
            },

            /**
             * Начать запись гифки
             */
            [MessageAgentType.startGif]: () => {
                if (!context) return;
                permitVideoOrGif(PermissionMode.gif);
            },

            /**
             * Закончить запись гифки
             */
            [MessageAgentType.stopGif]: () => {
                if (!context) return;
                MediaRecorderApi.stopGif();
            },

            /**
             * Перейти на страницу системного ресурса
             */
            [MessageAgentType.followResPage]: async (partUrl: string) => {
                const url = w.location.toString().replace(/application.+/, partUrl);
                const response = await fetch(url);
                const text = await response.text();
                sendMessageAgent({ type: MessagePopupType.setText, payload: { url, text } });
            },

            /**
             * Встроить в страницу окошко записи видео
             */
            [MessageAgentType.addRecWindow]: () => {
                Agent.initDevtoolsMessageListener();
                setRecordWindow();
            },

            /**
             * Воспроизводить лог, выбранной задачи
             * @param log - лог, прикреплённый к задаче
             */
            [MessageAgentType.reproduceLog]: async (log: IUserActionType[]) => {
                await toReproduceLog(log);
            }
        };

        Agent.initDevtoolsMessageListener();
    }

    /**
     * Обработчик событий, приходящих от логгера CoreAnalytics
     * @param data - приходящие данные от логгера CoreAnalytics
     */
    static analyticHandler(data: any) {
        let type: Types = Types.unknown;
        let dataMap: Map<string, string | undefined | boolean> = new Map();

        //открытие/обновление/закрытие формы
        if (
            (data.controlType === "Form" && data.operation === Types.open) ||
            (data.controlType === "Container" && (data.operation === Types.refresh || data.operation === Types.close))
        ) {
            formName = data.controlLabel;
            dataMap.set(Components.formName, data.controlLabel);
            dataMap.set(Components.formDFDName, data.formName);
            dataMap.set(Components.tab, data.formName);
            type = data.operation;
        }

        //открытие формы по навигатору
        if (data.controlType === "Navigator" && data.operation === Types.open) {
            formsPathNavigator += `"${data.controlLabel}",`;
            type = data.operation;
        }

        if (formsPathNavigator !== "" && formsPathNavigator.includes(formName?.replace(/ё/g, "е"))) {
            dataMap.set(Components.navigator, formsPathNavigator.replace(/,$/m, ""));
            dataMap.set(Components.tab, data.formName);
            type = Types.open;
            formsPathNavigator = "";
        }

        //сделать активным/масштабирование таб
        if (
            data.controlType === "Container" &&
            (data.operation === Types.setActive ||
                data.operation === Types.minimize ||
                data.operation === Types.fullscreen ||
                data.operation === Types.refresh)
        ) {
            let reg = /[A-Z]/gi;
            if (data.controlLabel.match(reg) !== null) {
                tabActive = data.formName;
            } else tabActive = data.controlLabel;
            dataMap.set(Components.tab, tabActive);
            dataMap.set(Components.formName, data.formName);
            type = data.operation;
        }

        //открытие вкладки фильтра
        if (
            data.controlLabel?.includes("Фильтр") &&
            (data.operation === Types.slamming || data.operation === Types.setActive)
        ) {
            dataMap.set("filter", true);
            type = data.operation;
        }

        //сформировать лог
        const log: any | IUserActionType = formLogFromCoreAnalytics(dataMap, type, formName, tabActive, tabContainer);
        //если пользователь не взаимодействовал ни с одним ui-компонентом
        if (log === null) return;

        //сохранить лог в IndexedDB
        saveDataInIDB(StoreName.logActions, log).then(async () => {
            const img = MediaRecorderApi.screenUp();
            await saveDataInIDB(StoreName.screenshots, img);
        });
    }

    /**
     * Подписаться на события логгера CoreAnalytics
     */
    static getDataFromLogger() {
        const coreAnalytics = window.CoreAnalytics;
        if (coreAnalytics) {
            //проверяем является ли открытый проект "Консолидацией"
            if (coreAnalytics._applicationName === "consolidation") isConsolidation = true;
            coreAnalytics._enabledLog = "true";
            if (coreAnalytics.subscribe) {
                coreAnalytics.subscribe(Agent.analyticHandler);
            }
            //coreAnalytics._observer.unsubscribe();
        }
    }

    /**
     * Подписаться на прослушивания входящих сообщений от Devtools и Popup
     */
    static initDevtoolsMessageListener() {
        window.addEventListener("message", onMessage);
    }

    /**
     * Отклик на действия, совершённые пользователем
     * @param type - тип события
     * @param event - событие
     */
    static callbackEvent(type: Types, event: Event) {
        //хранит ui-компоненты, с которыми взаимодействовал пользователь
        let mapOfComponents: Map<string, HTMLElement> = new Map();

        //нахождение ui-компонентов, с которыми взаимодействовал пользователь
        tabContainer = findTabContainer(event);
        findBigButton(event, mapOfComponents, tabActive);
        findGridToolbar(event, mapOfComponents);
        type = findCheckBox(event, mapOfComponents, type);
        findGridCell(event, mapOfComponents, type);
        findQuickFilter(event, mapOfComponents, type);
        findModalWindow(event, mapOfComponents, type);
        findFilter(event, mapOfComponents, type, isConsolidation);
        findCombobox(event);
        findDatePicker(event);

        //формируем лог
        const log: IUserActionType | null = formLog(
            mapOfComponents,
            type,
            event,
            formName,
            tabActive,
            tabContainer,
            isConsolidation
        );

        //если не было никакого взаимодействия ни с одним ui-компонентом
        if (log === null) return;

        //не включать лог, который не несёт полезной информации
        if (checkEventChange(log) || log.type === Types.focus || (log.type === Types.blur && log.value === undefined))
            return;

        //сохранить лог в IndexedDb
        saveDataInIDB(StoreName.logActions, log).then(async () => {
            const img = MediaRecorderApi.screenUp();
            await saveDataInIDB(StoreName.screenshots, img);
        });
    }

    /**
     * Включит режим инспектора страницы (прослушивать пользовательские действия)
     */
    static attachSelectClickHandler = () => {
        this.window.addEventListener(
            Types.click,
            (e: MouseEvent) => {
                if (e.detail === 1) {
                    //подождать изменения связанные с действием на странице
                    setTimeout(() => this.callbackEvent(Types.click, e), 2000);
                } else if (e.detail === 2) {
                    setTimeout(() => this.callbackEvent(Types.dblclick, e), 2000);
                }
            },
            true
        );
        [Types.change, Types.focus, Types.blur].forEach(eventName => {
            this.window.addEventListener(
                eventName,
                (e: Event) => {
                    setTimeout(() => this.callbackEvent(eventName, e), 2000);
                },
                true
            );
        });
    };

    /**
     * Прекратит режим инспекторы страницы (отписаться от всех приходящих действий от пользователя)
     */
    static removeSelectClickHandler() {
        [Types.click, Types.change, Types.focus, Types.blur].forEach(eventName => {
            this.window.removeEventListener(
                eventName,
                function() {
                    console.log(`${eventName} END`);
                },
                true
            );
        });
    }

    /**
     * Обрабатывать входящие сообщения
     * @param message - входящие сообщение от Devtools или Popup
     */
    static handleMessage(message: HandlerMessageAgentType) {
        const handler: Function = this.handlers[message.name];
        if (!handler) {
            console.warn("Не найден обработчик для события ", message.name);
            this.removeSelectClickHandler();
            return;
        }

        handler(message.data);
    }
}
