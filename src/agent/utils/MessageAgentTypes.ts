import { ISessionData, IUserActionType } from "../../indexedDB/indexeddb";

export interface HandlerMessageAgentType {
    source: string;
    name: MessageAgentType;
    data?: void | ISessionData | [number, number] | string | boolean | IUserActionType;
}

export enum MessageAgentType {
    connectAgent = "connectAgent",
    connectAgPopup = "connectAgentFromPopup",
    getData = "getData",
    clearData = "clearData",
    startVideo = "startVideo",
    stopVideo = "stopVideo",
    saveSession = "saveSession",
    makeScreenshot = "makeScreenshot",
    followLink = "followLink",
    startGif = "startGif",
    stopGif = "stopGif",
    followResPage = "followResourcePage",
    addRecWindow = "addRecordWindow",
    disconnect = "disconnect",
    reproduceLog = "reproduceLog"
}

export type SendMessageAgentType =
    | { type: MessageAgentType.connectAgent }
    | { type: MessageAgentType.connectAgPopup }
    | { type: MessageAgentType.clearData }
    | { type: MessageAgentType.startVideo }
    | { type: MessageAgentType.stopVideo }
    | { type: MessageAgentType.saveSession; payload?: ISessionData }
    | { type: MessageAgentType.getData; payload: [number, number] }
    | { type: MessageAgentType.makeScreenshot }
    | { type: MessageAgentType.followLink; payload: string }
    | { type: MessageAgentType.startGif }
    | { type: MessageAgentType.stopGif }
    | { type: MessageAgentType.followResPage; payload: string }
    | { type: MessageAgentType.addRecWindow }
    | { type: MessageAgentType.disconnect }
    | { type: MessageAgentType.reproduceLog; payload: IUserActionType[] };
