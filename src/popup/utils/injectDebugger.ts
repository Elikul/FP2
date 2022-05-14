import sendMessagePopup from "./sendMessagePopup";
import { MessageAgentType } from "../../agent/utils/MessageAgentTypes";
import { getTabId } from "./portPopup";

/**
 * Встроить в страницу и исполнить скрипт класса Agent (agent.bundle.js)
 */
export const injectPopupDebugger = async () => {
    let browser = require("webextension-polyfill");

    const tabId = await getTabId(browser);
    const manifestVersion = browser.runtime.getManifest().manifest_version;
    let resultScript;
    if (manifestVersion === 3) {
        resultScript = await browser.scripting.executeScript({
            files: ["agent.bundle.js"],
            target: { tabId, allFrames: true }
        });
    } else {
        resultScript = await browser.tabs.executeScript(tabId, {
            file: "agent.bundle.js",
            allFrames: true
        });
    }
    if (resultScript) {
        await sendMessagePopup({ type: MessageAgentType.connectAgPopup });
    }
};
