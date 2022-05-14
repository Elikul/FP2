import configureStore from "./configureStore";
import { Provider } from "react-redux";
import { StorePopupType } from "../reducers";

const ProviderWithComponent = (Component: any) => (initialState?: Partial<StorePopupType>): any => (
    <Provider store={configureStore(initialState)}>
        <Component />
    </Provider>
);

export default ProviderWithComponent;
