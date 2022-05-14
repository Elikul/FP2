import sessionReducer from "../SessionReducer";
import * as Action from "../../actions/sessionAction";
import { ISessionData } from "../../../indexedDB/indexeddb";

describe("SessionReducer", () => {
    const initialState = {
        currentSession: null,
        sessionData: [
            {
                dateOfStart: 1617971927343,
                dateOfEnd: 0,
                generatedCode: [],
                log: [],
                title: "Текущая",
                screenshots: [],
                recordUrl: ""
            }
        ],
        startSessionDate: 0,
        stopSessionDate: 0
    };

    it("Должен менять состояния", () => {
        expect(sessionReducer(initialState, Action.setCurrentSession(1))).toEqual({
            ...initialState,
            currentSession: 1
        });

        let sessionData: ISessionData[] = [];
        expect(sessionReducer(initialState, Action.setSessionData(sessionData))).toEqual({
            ...initialState,
            sessionData: []
        });

        let session: ISessionData = {
            dateOfStart: 1617971927343,
            dateOfEnd: 1617968897352,
            generatedCode: [],
            log: [],
            title: "09-04-2021 12:23:45",
            screenshots: [],
            recordUrl: ""
        };
        expect(sessionReducer(initialState, Action.setSessionByKey(session))).toEqual({
            ...initialState,
            sessionData: [
                {
                    dateOfStart: 1617971927343,
                    dateOfEnd: 1617968897352,
                    generatedCode: [],
                    log: [],
                    title: "09-04-2021 12:23:45",
                    screenshots: [],
                    recordUrl: ""
                }
            ]
        });
    });
});
