import { createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import { InfoScreenshot, IUserActionType } from "../../indexedDB/indexeddb";
import {
    attachFiles,
    disableCreateIssue,
    getApiKey,
    IssueAction,
    removeAllAttachments,
    removeAllScreenshots,
    removeAttachmentFiles,
    setApiKey,
    setGif,
    setIssueLog,
    setIssuePriority,
    setIssueTracker,
    setLink,
    setRedmineProject,
    setMember,
    setScreenshots,
    setScreenshot,
    setVideo,
    showLog,
    showModalCreateIssue,
    showScreenshots,
    withGif,
    withScreenshots,
    withVideo,
    loadScreenshot,
    setTestingDepartment,
    setDecisionType,
    setComponentFK,
    setByCentralOffice
} from "../actions/issueAction";
import { IOption } from "../../Redmine/utilsRedmine";
import { AttachFilesType } from "../components/redmineIssue/AttachFiles";
import { PriorityOfIssue, TrackerIssue } from "../../Redmine/redmineTypes";
import { ComponentsFK, DecisionTypes, TestingDepartments } from "../../Redmine/redmineProjects/fk-asp";
import { FieldOption } from "../components/utils/getOptions";
import { getApi, setApi } from "../../Redmine/ApiKey";

export interface IssueReducerState {
    apikey: string | null;
    screenshots: InfoScreenshot[];
    showModalCreateIssue: boolean;
    issueLog: IUserActionType[];
    issueTracker: FieldOption<TrackerIssue> | null;
    issuePriority: FieldOption<PriorityOfIssue> | null;
    selectedProject: IOption | null;
    selectedMember: IOption | null;
    attachments: AttachFilesType[];
    stateOpenScreenshot: boolean;
    stateOpenLog: boolean;
    video: File | null;
    gif: File | null;
    stateWithVideo: boolean;
    stateWithGif: boolean;
    stateWithScreenshots: boolean;
    disableCreateIssue: boolean;
    link: string;
    isLoadScreenshot: boolean;
    testingDepartment: FieldOption<TestingDepartments> | null;
    decisionType: FieldOption<DecisionTypes> | null;
    componentFK: FieldOption<ComponentsFK> | null;
    byCentralOffice: boolean;
}

const apikeyReducer = createReducer<string | null, IssueAction>(null)
    .handleAction(setApiKey, (state, { payload }) => {
        setApi(payload);
        return payload;
    })
    .handleAction(getApiKey, () => getApi());

const screenshotsReducer = createReducer<InfoScreenshot[], IssueAction>([])
    .handleAction(setScreenshot, (state, { payload }) => [...state, payload])
    .handleAction(setScreenshots, (state, { payload }) => payload)
    .handleAction(removeAllScreenshots, () => []);

const showModalCreateIssueReducer = createReducer<boolean, IssueAction>(false).handleAction(
    showModalCreateIssue,
    (state, { payload }) => payload
);

const issueLogReducer = createReducer<IUserActionType[], IssueAction>([]).handleAction(
    setIssueLog,
    (state, { payload }) => payload
);

const issueTrackerReducer = createReducer<FieldOption<TrackerIssue> | null, IssueAction>(null).handleAction(
    setIssueTracker,
    (_, { payload }) => payload
);

const issuePriorityReducer = createReducer<FieldOption<PriorityOfIssue> | null, IssueAction>(null).handleAction(
    setIssuePriority,
    (_, { payload }) => payload
);

const selectedProjectReducer = createReducer<IOption | null, IssueAction>(null).handleAction(
    setRedmineProject,
    (_, { payload }) => payload
);

const selectedMemberReducer = createReducer<IOption | null, IssueAction>(null).handleAction(
    setMember,
    (_, { payload }) => payload
);

const attachmentsReducer = createReducer<AttachFilesType[], IssueAction>([])
    .handleAction(attachFiles, (state, { payload }) => [...state, payload])
    .handleAction(removeAttachmentFiles, (state, { payload }) => payload)
    .handleAction(removeAllAttachments, () => []);

const stateOpenScreenshotReducer = createReducer<boolean, IssueAction>(false).handleAction(
    showScreenshots,
    (state, { payload }) => payload
);

const stateOpenLogReducer = createReducer<boolean, IssueAction>(false).handleAction(
    showLog,
    (state, { payload }) => payload
);

const videoReducer = createReducer<File | null, IssueAction>(null).handleAction(setVideo, (_, { payload }) => payload);

const gifReducer = createReducer<File | null, IssueAction>(null).handleAction(setGif, (_, { payload }) => payload);

const stateWithVideoReducer = createReducer<boolean, IssueAction>(false).handleAction(
    withVideo,
    (state, { payload }) => payload
);

const stateWithGifReducer = createReducer<boolean, IssueAction>(false).handleAction(
    withGif,
    (state, { payload }) => payload
);

const stateWithScreenshotsReducer = createReducer<boolean, IssueAction>(false).handleAction(
    withScreenshots,
    (state, { payload }) => payload
);

const disableCreateIssueReducer = createReducer<boolean, IssueAction>(true).handleAction(
    disableCreateIssue,
    (state, { payload }) => payload
);

const linkReducer = createReducer<string, IssueAction>("").handleAction(setLink, (state, { payload }) => payload);

const isLoadScreenshotReducer = createReducer<boolean, IssueAction>(false).handleAction(
    loadScreenshot,
    (state, { payload }) => payload
);

const testingDepartmentReducer = createReducer<FieldOption<TestingDepartments> | null, IssueAction>(null).handleAction(
    setTestingDepartment,
    (state, { payload }) => payload
);

const decisionTypeReducer = createReducer<FieldOption<DecisionTypes> | null, IssueAction>(null).handleAction(
    setDecisionType,
    (state, { payload }) => payload
);

const componentFKReducer = createReducer<FieldOption<ComponentsFK> | null, IssueAction>(null).handleAction(
    setComponentFK,
    (state, { payload }) => payload
);

const byCentralOfficeReducer = createReducer<boolean, IssueAction>(false).handleAction(
    setByCentralOffice,
    (state, { payload }) => payload
);

const issueReducer = combineReducers<IssueReducerState>({
    apikey: apikeyReducer,
    screenshots: screenshotsReducer,
    showModalCreateIssue: showModalCreateIssueReducer,
    issueLog: issueLogReducer,
    issueTracker: issueTrackerReducer,
    issuePriority: issuePriorityReducer,
    selectedProject: selectedProjectReducer,
    selectedMember: selectedMemberReducer,
    attachments: attachmentsReducer,
    stateOpenScreenshot: stateOpenScreenshotReducer,
    stateOpenLog: stateOpenLogReducer,
    video: videoReducer,
    gif: gifReducer,
    stateWithVideo: stateWithVideoReducer,
    stateWithGif: stateWithGifReducer,
    stateWithScreenshots: stateWithScreenshotsReducer,
    disableCreateIssue: disableCreateIssueReducer,
    link: linkReducer,
    isLoadScreenshot: isLoadScreenshotReducer,
    testingDepartment: testingDepartmentReducer,
    decisionType: decisionTypeReducer,
    componentFK: componentFKReducer,
    byCentralOffice: byCentralOfficeReducer
});

export default issueReducer;
