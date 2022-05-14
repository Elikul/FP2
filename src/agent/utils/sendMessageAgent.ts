import { SendMessageAgentHandlerType } from "../../ui/util/inspectWindow/MessageHandlerTypes";
import { SendMessagePopupType } from "../../popup/utils/MessagePopupTypes";

/**
 * Отправить сообщение от Agent
 * @param data - данные для отправки
 */
const sendMessageAgent = (data: SendMessageAgentHandlerType | SendMessagePopupType) => {
    const payload = "payload" in data ? data.payload : {};
    window.postMessage(
        {
            source: "inspect-agent",
            name: data.type,
            data: payload
        },
        "*"
    );
};

export default sendMessageAgent;
