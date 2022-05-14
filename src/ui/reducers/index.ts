import { combineReducers } from "redux";
import MainState, { MainReducerState } from "./MainReducer";
import SessionState, { SessionReducerState } from "./SessionReducer";
import IssueState, { IssueReducerState } from "./IssueReducer";
import { getType } from "typesafe-actions";
import { clearStore } from "../actions/mainAction";

export interface StoreType {
    MainState: MainReducerState;
    SessionState: SessionReducerState;
    IssueState: IssueReducerState;
}

const rootReducer = combineReducers<StoreType>({
    MainState,
    SessionState,
    IssueState
} as any);

const extReducer = (state, action) => {
    // Clear all data in redux store to initial.
    if (action.type === getType(clearStore)) state = undefined;

    return rootReducer(state, action);
};

export default extReducer;
