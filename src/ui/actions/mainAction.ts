import { ActionType, createStandardAction } from "typesafe-actions";

export const connectSuccess = createStandardAction("CONNECTION_SUCCESS")();
export const setLoading = createStandardAction("SET_LOADING")<boolean>();
export const clearStore = createStandardAction("CLEAR_STORE")();

export type MainAction = ActionType<typeof connectSuccess | typeof setLoading | typeof clearStore>;
