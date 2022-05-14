import sendMessageAgent from "../agent/utils/sendMessageAgent";
import { MessageAgentHandlerType } from "../ui/util/inspectWindow/MessageHandlerTypes";

let browser = require("webextension-polyfill");

/**
 * Прослушивать исходящие сообщения от Agent
 * (agent -> **content-script.js** -> background.ts -> dev tools / popup)
 */
window.addEventListener("message", async event => {
    //Принимать только сообщения от такого же окна
    if (event.source !== window) {
        return;
    }

    let message = event.data;

    //Принимать только сообщения корректного формата
    if (typeof message !== "object" || message === null || message.source !== "inspect-agent") {
        return;
    }

    await browser.runtime.sendMessage(message);
});

/**
 * Прослушивать входящие сообщения Agent
 * (agent <- **content-script.js** <- background.ts <- dev tools / popup)
 */
browser.runtime.onMessage.addListener(async (message: any) => {
    message.source = "inspect-window";
    window.postMessage(message, "*");
});

/**
 * При перезагрузке страницы Agent перезагрузить панель в Devtools
 */
window.onload = event => {
    sendMessageAgent({ type: MessageAgentHandlerType.reloaded });
};
