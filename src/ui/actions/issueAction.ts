import { ActionType, createStandardAction } from "typesafe-actions";
import { InfoScreenshot, IUserActionType } from "../../indexedDB/indexeddb";
import { IOption } from "../../Redmine/utilsRedmine";
import { AttachFilesType } from "../components/redmineIssue/AttachFiles";
import { PriorityOfIssue, TrackerIssue } from "../../Redmine/redmineTypes";
import { ComponentsFK, DecisionTypes, TestingDepartments } from "../../Redmine/redmineProjects/fk-asp";
import { FieldOption } from "../components/utils/getOptions";

export const setApiKey = createStandardAction("SET_API_KEY")<string>();
export const getApiKey = createStandardAction("GET_API_KEY")();
export const setScreenshots = createStandardAction("SET_SCREENSHOTS")<InfoScreenshot>();
export const showModalCreateIssue = createStandardAction("SHOW_MODAL_CREATE_ISSUE")<boolean>();
export const setIssueLog = createStandardAction("SET_ISSUE_LOG")<IUserActionType[]>();
export const setIssueTracker = createStandardAction("SET_ISSUE_TRACKER")<FieldOption<TrackerIssue> | null>();
export const setIssuePriority = createStandardAction("SET_ISSUE_PRIORITY")<FieldOption<PriorityOfIssue> | null>();
export const setRedmineProject = createStandardAction("SET_REDMINE_PROJECT")<IOption | null>();
export const setMember = createStandardAction("SET_MEMBER")<IOption | null>();
export const attachFiles = createStandardAction("ATTACH_FILES")<AttachFilesType>();
export const removeAttachmentFiles = createStandardAction("REMOVE_ATTACHMENT_FILES")<AttachFilesType[]>();
export const removeAllAttachments = createStandardAction("REMOVE_ALL_ATTACHMENTS_FILES")();
export const removeScreenshot = createStandardAction("REMOVE_SCREENSHOT")<InfoScreenshot[]>();
export const removeAllScreenshots = createStandardAction("REMOVE_ALL_SCREENSHOTS")();
export const showScreenshots = createStandardAction("SHOW_SCREENSHOTS")<boolean>();
export const showLog = createStandardAction("SHOW_LOG")<boolean>();
export const setVideo = createStandardAction("SET_VIDEO")<File>();
export const setGif = createStandardAction("SET_GIF")<File>();
export const withVideo = createStandardAction("WITH_VIDEO")<boolean>();
export const withGif = createStandardAction("WITH_GIF")<boolean>();
export const withScreenshots = createStandardAction("WITH_SCREENSHOTS")<boolean>();
export const disableCreateIssue = createStandardAction("DISABLE_CREATE_ISSUE")<boolean>();
export const setLink = createStandardAction("SET_LINK")<string>();
export const loadScreenshot = createStandardAction("LOAD_SCREENSHOT")<boolean>();
export const setTestingDepartment = createStandardAction("SET_TESTING_DEPARTMENT")<FieldOption<
    TestingDepartments
> | null>();
export const setDecisionType = createStandardAction("SET_DECISION_TYPE")<FieldOption<DecisionTypes> | null>();
export const setComponentFK = createStandardAction("SET_COMPONENT_FK")<FieldOption<ComponentsFK> | null>();
export const setByCentralOffice = createStandardAction("SET_BY_CENTRAL_OFFICE")<boolean>();

export type IssueAction = ActionType<
    | typeof setApiKey
    | typeof getApiKey
    | typeof setScreenshots
    | typeof showModalCreateIssue
    | typeof setIssueLog
    | typeof setIssueTracker
    | typeof setIssuePriority
    | typeof setRedmineProject
    | typeof setMember
    | typeof attachFiles
    | typeof removeAttachmentFiles
    | typeof removeAllAttachments
    | typeof removeAllScreenshots
    | typeof removeScreenshot
    | typeof showScreenshots
    | typeof showLog
    | typeof setVideo
    | typeof setGif
    | typeof withVideo
    | typeof withGif
    | typeof withScreenshots
    | typeof disableCreateIssue
    | typeof setLink
    | typeof loadScreenshot
    | typeof setTestingDepartment
    | typeof setDecisionType
    | typeof setComponentFK
    | typeof setByCentralOffice
>;
