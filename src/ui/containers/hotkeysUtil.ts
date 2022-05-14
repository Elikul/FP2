import { Dispatch } from "react";
import {
    removeAllAttachments,
    removeAllScreenshots,
    setLink,
    setRedmineProject,
    showModalCreateIssue
} from "../actions/issueAction";

/**
 * Имена, которые будут использоваться для быстрых клавиш
 */
export enum HotKeysName {
    record = "record",
    gifRecord = "gifRecord",
    saveRecord = "saveRecord",
    createIssue = "createIssue",
    copyCode = "copyCode",
    scaleCode = "scaleCode",
    scaleLog = "scaleLog",
    switchSession = "switchSessionBtn"
}

/**
 * Быстрые клавиши, которые будут использоваться
 */
export const HotKeys: Map<HotKeysName, string> = new Map([
    [HotKeysName.record, "Alt+S"],
    [HotKeysName.gifRecord, "Alt+G"],
    [HotKeysName.createIssue, "Alt+Z"],
    [HotKeysName.copyCode, "Alt+C"],
    [HotKeysName.saveRecord, "Shift+R"],
    [HotKeysName.scaleLog, "Shift+L"],
    [HotKeysName.scaleCode, "Shift+K"],
    [HotKeysName.switchSession, "Shift+S"]
]);

/**
 * Получит элемент по идентификатору и кликнуть по нему
 * @param id - идентификатор элемента
 */
const clickElementById = (id: string) => {
    document.getElementById(id)?.click();
};

//какая кнопка сессии
let sessionBtnNum: number = 0;

/**
 * Какой скрипт выполниться под заданным сочетанием клавиш
 */
const handlerHotKeys: Record<HotKeysName, Function> = {
    [HotKeysName.record]: () => {
        clickElementById("RecordBtn");
    },
    [HotKeysName.gifRecord]: () => {
        const menu = document.getElementById("Menu");
        if (menu === null) return;
        menu.click();
        clickElementById("GifBtn");
    },
    [HotKeysName.createIssue]: (dispatch: Dispatch<any>) => {
        const modal = document.getElementById("ModalIssue");
        if (modal) {
            dispatch(showModalCreateIssue(false));
            dispatch(setRedmineProject(null));
            dispatch(setLink(""));
            dispatch(removeAllAttachments());
            dispatch(removeAllScreenshots());
            return;
        }
        clickElementById("CreateIssue");
    },
    [HotKeysName.copyCode]: () => {
        clickElementById("CopyBtn");
    },
    [HotKeysName.saveRecord]: () => {
        clickElementById("SaveRecord");
    },
    [HotKeysName.scaleLog]: () => {
        clickElementById("logS");
    },
    [HotKeysName.scaleCode]: () => {
        clickElementById("codeS");
    },
    [HotKeysName.switchSession]: () => {
        const sessionBtns = document.getElementsByClassName("switch-session");
        if (sessionBtnNum >= sessionBtns.length) {
            sessionBtnNum = 0;
        }
        (sessionBtns[sessionBtnNum] as HTMLElement).focus();
        (sessionBtns[sessionBtnNum] as HTMLElement).click();
        sessionBtnNum += 1;
    }
};

/**
 * Какое событие выполнить под заданным сочетанием клавиш
 * @param ev - событие от клавиатуры
 * @param hotkeyName - имя, используемое для быстрых сочетаний клавиш
 * @param dispatch - функция отправления событий текущему окну
 */
export const isHotkey = (ev: KeyboardEvent, hotkeyName: HotKeysName, dispatch: Dispatch<any>) => {
    const keys: string[] | undefined = HotKeys.get(hotkeyName)?.split("+");
    if (!keys) return;
    let firstKey = keys[0] === "Alt" ? ev.altKey : ev.shiftKey;
    if ((firstKey && ev.key === keys[1]) || (firstKey && ev.key === keys[1].toLowerCase())) {
        handlerHotKeys[hotkeyName](dispatch);
    }
};
