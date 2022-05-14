import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import {
    createSession,
    SessionAction,
    setCurrentSession,
    setSessionByKey,
    setSessionData,
    setStartSession,
    setStopSession
} from "../actions/sessionAction";
import { ISessionData } from "../../indexedDB/indexeddb";

export interface SessionReducerState {
    currentSession: number | null;
    sessionData: ISessionData[];
    startSessionDate: number;
    stopSessionDate: number;
}

const sessionDataReducer = createReducer<ISessionData[], SessionAction>([])
    .handleAction(createSession, state => {
        const newEl: ISessionData = {
            dateOfStart: Date.now(),
            dateOfEnd: 0,
            title: "Текущая",
            log: [],
            generatedCode: [],
            screenshots: [],
            recordUrl: ""
        };

        return [...state, newEl];
    })
    .handleAction(setSessionData, (state, { payload }) => payload)
    .handleAction(setSessionByKey, (state, action) =>
        state.map((el, index, arr) => {
            if (arr.length - 1 === index) {
                return action.payload;
            }

            return el;
        })
    );

const currentSessionReducer = createReducer<SessionReducerState["currentSession"], SessionAction>(null)
    .handleAction(createSession, () => null)
    .handleAction(setCurrentSession, (_, { payload }) => payload);

const startSessionDateReducer = createReducer<number, SessionAction>(0).handleAction(setStartSession, () => Date.now());
const stopSessionDateReducer = createReducer<number, SessionAction>(0).handleAction(setStopSession, () => Date.now());

const sessionReducer = combineReducers<SessionReducerState>({
    currentSession: currentSessionReducer,
    sessionData: sessionDataReducer,
    startSessionDate: startSessionDateReducer,
    stopSessionDate: stopSessionDateReducer
});

export default sessionReducer;
