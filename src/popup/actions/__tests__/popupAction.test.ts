import * as popupAction from "../popupAction";

describe("popupActions", () => {
    it("should return correct type", () => {
        expect(popupAction.connectPopup()).toEqual({
            type: "CONNECT_POPUP"
        });

        expect(popupAction.setLoading(false)).toEqual({
            payload: false,
            type: "SET_LOADING"
        });

        expect(popupAction.hideTable(false)).toEqual({
            payload: false,
            type: "HIDE_TABLE"
        });

        expect(popupAction.setCurPopupBtn(2)).toEqual({
            payload: 2,
            type: "SET_CUR_POPUP_BTN"
        });

        expect(popupAction.clearPopupStore()).toEqual({
            type: "CLEAR_POPUP_STORE"
        });
    });
});
