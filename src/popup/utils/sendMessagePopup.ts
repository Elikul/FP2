import { popupPort } from "..";
import { SendMessageAgentType } from "../../agent/utils/MessageAgentTypes";
import { getTabId, testPort } from "./portPopup";

// Сделано для отключения обработки extension при тестах
const test = process.env.NODE_ENV === "test";

/**
 * Получит id активного таба, которому будут посылать сообщения (Popup -> Agent)
 */
const setTabId = async (): Promise<number | undefined> => {
    let browser = require("webextension-polyfill");
    return await getTabId(browser);
};

/**
 * Посылать исходящие сообщения (Popup -> Agent)
 * @param data - посылаемые данные
 */
const sendMessagePopup = async (data: SendMessageAgentType) => {
    const payload = "payload" in data ? data.payload : {};
    if (test) {
        testPort.postMessage({
            name: data.type,
            tabId: 1,
            data: payload
        });
        return;
    }
    let id = await setTabId();
    popupPort.postMessage({
        name: data.type,
        tabId: id,
        data: payload
    });
};

export default sendMessagePopup;
