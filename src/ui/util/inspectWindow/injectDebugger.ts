import { Browser } from "webextension-polyfill";
import { MessageAgentType } from "../../../agent/utils/MessageAgentTypes";
import sendMessageAgentHandler from "./sendMessageAgentHandler";

/**
 * Встроить в страницу и исполнить скрипт для записи гиф
 * @param browser - информация о браузуре
 */
const injectRecorder = async (browser: Browser) => {
    const response = await fetch(browser.runtime.getURL("recorderUtils.bundle.js"));
    const script = await response.text();
    await browser.devtools.inspectedWindow.eval(script);
};

/**
 * Встроить в страницу и исполнить скрипт класса Agent ("agent.bundle.js")
 */
export const injectDebugger = async () => {
    let browser = require("webextension-polyfill");
    const response = await fetch(browser.runtime.getURL("agent.bundle.js"));
    const script = await response.text();
    let resultScript = await browser.devtools.inspectedWindow.eval(script);
    if (resultScript) {
        sendMessageAgentHandler({ type: MessageAgentType.connectAgent });
    }
    await injectRecorder(browser);
};
