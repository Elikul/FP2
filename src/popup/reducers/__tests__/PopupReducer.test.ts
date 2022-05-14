import popupReducer from "../PopupReducer";
import * as Action from "../../actions/popupAction";

describe("PopupReducer", () => {
    const initialState = {
        connect: false,
        isLoading: false,
        hideTable: true,
        curBtn: -1
    };

    it("Должен менять состояния", () => {
        expect(popupReducer(initialState, Action.connectPopup())).toEqual({
            ...initialState,
            connect: true
        });

        expect(popupReducer(initialState, Action.setLoading(true))).toEqual({
            ...initialState,
            isLoading: true
        });

        expect(popupReducer(initialState, Action.hideTable(false))).toEqual({
            ...initialState,
            hideTable: false
        });

        expect(popupReducer(initialState, Action.setCurPopupBtn(3))).toEqual({
            ...initialState,
            curBtn: 3
        });
    });
});
