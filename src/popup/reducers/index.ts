import { combineReducers } from "redux";
import PopupState, { PopupReducerState } from "./PopupReducer";
import { getType } from "typesafe-actions";
import { clearPopupStore } from "../actions/popupAction";

export interface StorePopupType {
    PopupState: PopupReducerState;
}

const rootPopupReducer = combineReducers<StorePopupType>({ PopupState } as any);

const extPopupReducer = (state, action) => {
    // Clear all data in redux store to initial.
    if (action.type === getType(clearPopupStore)) state = undefined;

    return rootPopupReducer(state, action);
};

export default extPopupReducer;
