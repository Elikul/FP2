import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer, { StorePopupType } from "../reducers/index";

export default (initialState?: Partial<StorePopupType>) => {
    const middleWare = [thunk];

    if (process.env.NODE_ENV === "development") {
        const logger = createLogger({
            collapsed: true
        });

        middleWare.push(logger as any);
    }

    return createStore(reducer, initialState, compose(applyMiddleware(...middleWare)));
};
