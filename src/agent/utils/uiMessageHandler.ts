import { HandlerMessageAgentType } from "./MessageAgentTypes";
import Agent from "../Agent";

/**
 * Реакция на полученное сообщение
 * @param event - событие с сообщением
 */
export const onMessage = event => {
    //Принимать сообщения только от такого же frame
    // event.source - источник события
    if (event.source !== window) {
        return;
    }

    const message: HandlerMessageAgentType = event.data;

    //Принимать сообщения только корректного формата (сообщения с заданными именами)
    if (typeof message !== "object" || message === null || message.source !== "inspect-window") {
        return;
    }

    Agent.handleMessage(message);
};
