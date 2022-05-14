import mainReducer from "../MainReducer";
import * as Action from "../../actions/mainAction";

describe("MainReducer", () => {
    const initialState = {
        connectAgent: false,
        isLoading: false
    };

    it("Должен менять состояния", () => {
        expect(mainReducer(initialState, Action.connectSuccess())).toEqual({
            ...initialState,
            connectAgent: true
        });

        expect(mainReducer(initialState, Action.setLoading(true))).toEqual({
            ...initialState,
            isLoading: true
        });
    });
});
