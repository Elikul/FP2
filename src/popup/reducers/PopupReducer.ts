import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { PopupAction, hideTable, setCurPopupBtn, connectPopup, setLoading } from "../actions/popupAction";

export interface PopupReducerState {
    connect: boolean;
    isLoading: boolean;
    hideTable: boolean;
    curBtn: number;
}

const connectReducer = createReducer<boolean, PopupAction>(false).handleAction(connectPopup, () => true);
const loadingReducer = createReducer<boolean, PopupAction>(false).handleAction(setLoading, (_, { payload }) => payload);
const hideTableReducer = createReducer<boolean, PopupAction>(true).handleAction(hideTable, (_, { payload }) => payload);
const isIconReducer = createReducer<number, PopupAction>(-1).handleAction(setCurPopupBtn, (_, { payload }) => payload);

const popupReducer = combineReducers<PopupReducerState>({
    connect: connectReducer,
    isLoading: loadingReducer,
    hideTable: hideTableReducer,
    curBtn: isIconReducer
});

export default popupReducer;
