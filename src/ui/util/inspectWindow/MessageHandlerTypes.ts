import { InfoScreenshot, ISessionData, IUserActionType } from "../../../indexedDB/indexeddb";

export interface HandlerMessageAgentHandlerType {
    source: string;
    name: MessageAgentHandlerType;
    data?: void | number | InfoScreenshot | InfoScreenshot[] | IUserActionType[] | ISessionData | string;
}

export enum MessageAgentHandlerType {
    connectExtension = "connectExtension",
    startSession = "setDateStart",
    stopSession = "setDateEnd",
    attachSessionScreenshots = "attachSessionScreenshots",
    setUserData = "setUserData",
    addScreenshot = "addScreenshot",
    reloaded = "reloaded",
    setRecordUrl = "setRecordUrl"
}

export declare type SendMessageAgentHandlerType =
    | { type: MessageAgentHandlerType.connectExtension }
    | { type: MessageAgentHandlerType.startSession; payload: number }
    | { type: MessageAgentHandlerType.stopSession; payload: number }
    | { type: MessageAgentHandlerType.attachSessionScreenshots; payload: InfoScreenshot[] }
    | { type: MessageAgentHandlerType.setUserData; payload: IUserActionType[] }
    | { type: MessageAgentHandlerType.addScreenshot; payload: InfoScreenshot }
    | { type: MessageAgentHandlerType.reloaded }
    | { type: MessageAgentHandlerType.setRecordUrl; payload: string };
