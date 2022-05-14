let browser = require("webextension-polyfill");
import { MessageAgentHandlerType } from "../ui/util/inspectWindow/MessageHandlerTypes";
import { Runtime } from "webextension-polyfill/namespaces/runtime";
import { MessagePopupType } from "../popup/utils/MessagePopupTypes";
import { MessageAgentType } from "../agent/utils/MessageAgentTypes";

let connections: any = {};
/**
 * Отклик на приходящие сообщения от Agent
 * @param message - входящее сообщение
 * @param sender - отправитель
 */
const callbackMessage = async (message: any, sender: Runtime.MessageSender) => {
    if (sender.tab) {
        let tabId = sender.tab.id as number;
        if (tabId in connections) {
            connections[tabId].postMessage(message);
        } else {
            console.log("Tab not found in connection list.");
        }
    } else {
        console.log("sender.tab not defined.");
    }
    return true;
};

/**
 * Прослушивание сообщений от Devtools / Popup и посылать ответы
 * (agent -> content-script.js -> **background.js** -> dev tools / popup)
 */
browser.runtime.onMessage.addListener(callbackMessage);

/**
 * Отклик на соединение Agent и Devtools или Agent и Popup
 * @param port - порт соединения
 */
const callbackConnect = async (port: Runtime.Port) => {
    //прослушивать сообщения, отправленные из Devtools / Popup
    const callbackPort = async (message: any) => {
        console.log("incoming inspectWindow from dev tools page", message);

        //Регистрируем начальное соединение
        if ([MessageAgentHandlerType.connectExtension, MessagePopupType.connectPopup].includes(message.name)) {
            connections[message.tabId] = port;

            port.onDisconnect.addListener(async () => {
                await browser.tabs.sendMessage(message.tabId, { name: MessageAgentType.disconnect });
                delete connections[message.tabId];
            });

            return;
        }

        //Иначе транслировать сообщение агенту
        await browser.tabs.sendMessage(message.tabId, {
            name: message.name,
            data: message.data
        });
    };
    port.onMessage.removeListener(callbackPort);
    /**
     * Порт прослушивает приходящие сообщения
     */
    port.onMessage.addListener(callbackPort);
};

/**
 * Прослушивать запрос на соединение с Agent от Devtools / Popup
 * agent <- content-script.js <- **background.js** <- dev tools / popup
 */
browser.runtime.onConnect.addListener(callbackConnect);

/**
 * Добавить на экран окошко для записи видео
 */
const addRecordWindow = async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tabId = tabs[0].id;
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
        await browser.tabs.sendMessage(tabId, { name: MessageAgentType.connectAgPopup });
        await browser.tabs.sendMessage(tabId, { name: MessageAgentType.addRecWindow });
    }
};

enum commandNames {
    recordVideo = "recordVideo"
}

/**
 * Обработчик команд
 * @param command - команда (быстрое сочетание клавиш)
 */
const handlerCommands = async command => {
    if (command === commandNames.recordVideo) {
        await addRecordWindow();
    }
};

/**
 * Прослушивать команды
 */
browser.commands.onCommand.removeListener(handlerCommands);
browser.commands.onCommand.addListener(handlerCommands);
