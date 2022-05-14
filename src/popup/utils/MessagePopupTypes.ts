export enum MessagePopupType {
    connectPopup = "connectPopup",
    setText = "setText"
}

export type SendMessagePopupType =
    | { type: MessagePopupType.connectPopup }
    | { type: MessagePopupType.setText; payload: { url: string; text: string } };

export interface HandlerMessagePopupType {
    source: string;
    name: MessagePopupType;
    data?: void | { url: string; text: string };
}
