import * as sessionAction from "../sessionAction";
import { ISessionData } from "../../../indexedDB/indexeddb";

describe("sessionAction", function() {
    it("should return correct type", function() {
        expect(sessionAction.createSession()).toEqual({
            type: "CREATE_SESSION"
        });

        let sessionData: ISessionData[] = [];
        expect(sessionAction.setSessionData(sessionData)).toEqual({
            payload: [],
            type: "SET_SESSION_DATA"
        });

        let session: ISessionData = {
            dateOfStart: 1625821832749,
            dateOfEnd: 1625821845319,
            generatedCode: [],
            log: [],
            title: "09-07-2021 12:10:45",
            screenshots: [],
            recordUrl: ""
        };

        expect(sessionAction.setSessionByKey(session)).toEqual({
            payload: {
                dateOfStart: 1625821832749,
                dateOfEnd: 1625821845319,
                generatedCode: [],
                log: [],
                title: "09-07-2021 12:10:45",
                screenshots: [],
                recordUrl: ""
            },
            type: "SET_SESSION_BY_KEY"
        });

        let currentSession: number = 2;
        expect(sessionAction.setCurrentSession(currentSession)).toEqual({
            payload: 2,
            type: "SET_CURRENT_SESSION"
        });

        expect(sessionAction.setStartSession()).toEqual({
            type: "SET_START_GENERATION"
        });

        expect(sessionAction.setStopSession()).toEqual({
            type: "SET_STOP_GENERATION"
        });
    });
});
