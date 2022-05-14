import { ActionType, createStandardAction } from "typesafe-actions";

export const connectPopup = createStandardAction("CONNECT_POPUP")();
export const setLoading = createStandardAction("SET_LOADING")<boolean>();
export const hideTable = createStandardAction("HIDE_TABLE")<boolean>();
export const setCurPopupBtn = createStandardAction("SET_CUR_POPUP_BTN")<number>();
export const clearPopupStore = createStandardAction("CLEAR_POPUP_STORE")();

export type PopupAction = ActionType<
    typeof connectPopup | typeof setLoading | typeof hideTable | typeof setCurPopupBtn | typeof clearPopupStore
>;
