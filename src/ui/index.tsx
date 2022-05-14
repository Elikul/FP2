import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./style/main.less";
import MainContainer from "./containers/MainContainer/MainContainer";
import configureStore from "./store/configureStore";
import { injectDebugger } from "./util/inspectWindow/injectDebugger";
import { getApi } from "../Redmine/ApiKey";

const initialIssueState = {
    apikey: getApi(),
    screenshots: [],
    showModalCreateIssue: false,
    issueLog: [],
    issueTracker: null,
    issuePriority: null,
    selectedProject: null,
    selectedMember: null,
    attachments: [],
    stateOpenScreenshot: false,
    stateOpenLog: false,
    video: null,
    gif: null,
    stateWithVideo: false,
    stateWithGif: false,
    stateWithScreenshots: false,
    disableCreateIssue: true,
    link: "",
    isLoadScreenshot: false,
    testingDepartment: null,
    decisionType: null,
    componentFK: null,
    byCentralOffice: false
};

export const MainComponent = () => {
    return (
        <Provider
            store={configureStore({
                IssueState: initialIssueState
            })}
        >
            <MainContainer />
        </Provider>
    );
};

/**
 * Отрисовка содержимого панели в Devtools
 */
window.addEventListener("load", async () => {
    await injectDebugger();
    ReactDOM.render(<MainComponent />, document.getElementById("root"));
});
