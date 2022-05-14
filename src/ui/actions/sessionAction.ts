import { ActionType, createStandardAction } from "typesafe-actions";
import { ISessionData } from "../../indexedDB/indexeddb";

export const createSession = createStandardAction("CREATE_SESSION")();
export const setSessionData = createStandardAction("SET_SESSION_DATA")<ISessionData[]>();
export const setSessionByKey = createStandardAction("SET_SESSION_BY_KEY")<ISessionData>();
export const setCurrentSession = createStandardAction("SET_CURRENT_SESSION")<number>();
export const setStartSession = createStandardAction("SET_START_GENERATION")();
export const setStopSession = createStandardAction("SET_STOP_GENERATION")();

export type SessionAction = ActionType<
    | typeof setSessionByKey
    | typeof setSessionData
    | typeof createSession
    | typeof setCurrentSession
    | typeof setStartSession
    | typeof setStopSession
>;
