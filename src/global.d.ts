// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
    CoreModal: CoreModal;
    CoreAnalytics: CoreAnalytics;
    createModalDOM: (className: string, windowId: string) => JQuery;
    showModalInfo: (caption: string, note: string, windowId: string, closeFunction) => void;
    showModalLog: (text: string, title: string) => void;
    showModalDialog: (
        propsOrTitle: IShowModalDialogArgs | string,
        note?: string,
        okFn?: ICallbackArg,
        cancenFn?: ICallbackArg
    ) => JQuery;

    PROGRESS_CLASS: string;
    errorHandler: (...args: any[]) => any;
    parseJSON: (json: string) => any;
    showError: (text: string) => void;
    showWaiting: (text: string) => void;
    hideWaiting: () => void;

    createLogDOM(): JQuery;

    saveAsHtml(text: string): void;
}

declare const window: Window;

interface MediaDevices {
    getDisplayMedia(constraints?: DisplayMediasStreamConstraints): Promise<MediaStream>;
}
