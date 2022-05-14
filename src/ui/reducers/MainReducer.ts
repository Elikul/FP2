import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { connectSuccess, MainAction, setLoading } from "../actions/mainAction";

export interface MainReducerState {
    connectAgent: boolean;
    isLoading: boolean;
}

const connectAgentReducer = createReducer<boolean, MainAction>(false).handleAction(connectSuccess, () => true);
const isLoadingReducer = createReducer<boolean, MainAction>(false).handleAction(
    setLoading,
    (state, { payload }) => payload
);

const mainReducer = combineReducers<MainReducerState>({
    connectAgent: connectAgentReducer,
    isLoading: isLoadingReducer
});

export default mainReducer;
