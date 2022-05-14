import { MessageAgentHandlerType } from "./MessageHandlerTypes";

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
 * Установить соединение Agent и Dectools
 */
let backgroundPageConnection;

if (!test) {
    let browser = require("webextension-polyfill");

    backgroundPageConnection = browser.runtime.connect({
        name: "panel"
    });

    backgroundPageConnection.postMessage({
        name: MessageAgentHandlerType.connectExtension,
        tabId: browser.devtools.inspectedWindow.tabId
    });
}

export default !test ? backgroundPageConnection : testPort;
