import { Browser, Runtime } from "webextension-polyfill";
import { MessagePopupType } from "./MessagePopupTypes";

// Сделано для отключения обработки extension при тестах
const test = process.env.NODE_ENV === "test";
const testEvent = {
    addListener: (callback: any) => null
};

export const testPort = {
    onDisconnect: testEvent,
    onMessage: testEvent,
    postMessage: (obj: Object) => null
};

/**
 * Получить id активного таба
 * @param browser - данные о браузере
 */
export const getTabId = async (browser: Browser): Promise<number | undefined> => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    return tabs[0].id;
};

/**
 * Установить соединение между Agent и Popup
 */
const connectPopupPort = async (): Promise<Runtime.Port> => {
    let browser = require("webextension-polyfill");
    let tabId = await getTabId(browser);

    let port = browser.runtime.connect({
        name: "popup"
    });

    port.postMessage({
        name: MessagePopupType.connectPopup,
        tabId
    });
    return port;
};

/**
 * Получить порт соединения между Popup и Agent
 */
export const getPort = async () => {
    const port = await connectPopupPort();
    return !test ? port : testPort;
};
