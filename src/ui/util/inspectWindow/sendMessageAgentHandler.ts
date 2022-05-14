import port from "./port";
import { SendMessageAgentType } from "../../../agent/utils/MessageAgentTypes";

// Сделано для отключения обработки extension при тестах
const test = process.env.NODE_ENV === "test";

/**
 * Получит id инспектируемого окна, которому будут посылать сообщения (Devtools -> Agent)
 */
const setTabId = () => {
    if (!test) {
        let browser = require("webextension-polyfill");
        return browser.devtools.inspectedWindow.tabId;
    }
    return {
        devtools: {
            inspectedWindow: {
                tabId: 1
            }
        }
    };
};

/**
 * Посылать исходящие сообщения (Devtools -> Agent)
 * @param data - посылаемые данные
 */
const sendMessageAgentHandler = function(data: SendMessageAgentType) {
    const payload = "payload" in data ? data.payload : {};
    port.postMessage({
        name: data.type,
        tabId: setTabId(),
        data: payload
    });
};

export default sendMessageAgentHandler;
