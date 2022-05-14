import * as issueAction from "../issueAction";
import { InfoScreenshot, IUserActionType } from "../../../indexedDB/indexeddb";
import { IOption } from "../../../Redmine/utilsRedmine";
import { AttachFilesType } from "../../components/redmineIssue/AttachFiles";
import { PriorityOfIssue, TrackerIssue } from "../../../Redmine/redmineTypes";
import { ComponentsFK, DecisionTypes, TestingDepartments } from "../../../Redmine/redmineProjects/fk-asp";

const IMG_SRC: string = "image.png";

const VIDEO_URL: string = "video_1245.mp4";

const GIF_URL: string = "gif_1234.gif";

describe("issueActions", function() {
    it("should return correct type", function() {
        const api: string = "74ed5fe647fd4642ab2b63d3fa026ade9c32a445";
        expect(issueAction.setApiKey(api)).toEqual({
            payload: api,
            type: "SET_API_KEY"
        });

        expect(issueAction.getApiKey()).toEqual({
            type: "GET_API_KEY"
        });

        expect(issueAction.showModalCreateIssue(true)).toEqual({
            payload: true,
            type: "SHOW_MODAL_CREATE_ISSUE"
        });

        const screenshot: InfoScreenshot = { date: 1634805111188, screenshot: IMG_SRC };
        expect(issueAction.setScreenshots(screenshot)).toEqual({
            payload: screenshot,
            type: "SET_SCREENSHOTS"
        });

        const log: IUserActionType[] = [
            {
                date: 1629708188145,
                dfdNameForm: undefined,
                isFilter: false,
                nameForm: "Выполнение пакетной замены",
                navigator: undefined,
                tab: "Результат замены",
                tabContainer: "node1",
                type: "set active"
            },
            {
                date: 1629708188318,
                dfdNameForm: "FD_Replacement",
                isFilter: false,
                nameForm: "Выполнение пакетной замены",
                navigator: 'Пакетная замена","Выполнение пакетной замены","',
                tab: "Результат замены",
                tabContainer: "node1",
                type: "open"
            }
        ];
        expect(issueAction.setIssueLog(log)).toEqual({
            payload: log,
            type: "SET_ISSUE_LOG"
        });

        const tracker = { value: TrackerIssue.etc, label: "Прочие" };
        expect(issueAction.setIssueTracker(tracker)).toEqual({
            payload: tracker,
            type: "SET_ISSUE_TRACKER"
        });

        const priority = { value: PriorityOfIssue.low, label: "Низкий" };
        expect(issueAction.setIssuePriority(priority)).toEqual({
            payload: priority,
            type: "SET_ISSUE_PRIORITY"
        });

        const project: IOption = {
            value: 100,
            label: "Тульская область"
        };
        expect(issueAction.setRedmineProject(project)).toEqual({
            payload: project,
            type: "SET_REDMINE_PROJECT"
        });

        const member: IOption = {
            value: 1230,
            label: "Иванов Иван"
        };
        expect(issueAction.setMember(member)).toEqual({
            payload: member,
            type: "SET_MEMBER"
        });

        const attaching: AttachFilesType = {
            file: new File([IMG_SRC], "file.png"),
            src: IMG_SRC
        };
        expect(issueAction.attachFiles(attaching)).toEqual({
            payload: attaching,
            type: "ATTACH_FILES"
        });

        const attachingFiles: AttachFilesType[] = [
            { file: new File([IMG_SRC], "file1.png"), src: IMG_SRC },
            { file: new File([IMG_SRC], "file2.png"), src: IMG_SRC }
        ];
        expect(issueAction.removeAttachmentFiles(attachingFiles)).toEqual({
            payload: attachingFiles,
            type: "REMOVE_ATTACHMENT_FILES"
        });

        expect(issueAction.removeAllAttachments()).toEqual({
            type: "REMOVE_ALL_ATTACHMENTS_FILES"
        });

        const screenshots: InfoScreenshot[] = [
            { date: 1634805111188, screenshot: IMG_SRC },
            { date: 1634807716867, screenshot: IMG_SRC }
        ];
        expect(issueAction.removeScreenshot(screenshots)).toEqual({
            payload: screenshots,
            type: "REMOVE_SCREENSHOT"
        });

        expect(issueAction.removeAllScreenshots()).toEqual({
            type: "REMOVE_ALL_SCREENSHOTS"
        });

        expect(issueAction.showScreenshots(true)).toEqual({
            payload: true,
            type: "SHOW_SCREENSHOTS"
        });

        expect(issueAction.showLog(true)).toEqual({
            payload: true,
            type: "SHOW_LOG"
        });

        const VideoFile: File = new File([VIDEO_URL], "video.mp4");
        expect(issueAction.setVideo(VideoFile)).toEqual({
            payload: VideoFile,
            type: "SET_VIDEO"
        });

        const GifFile: File = new File([GIF_URL], "gif.gif");
        expect(issueAction.setGif(GifFile)).toEqual({
            payload: GifFile,
            type: "SET_GIF"
        });

        expect(issueAction.withVideo(false)).toEqual({
            payload: false,
            type: "WITH_VIDEO"
        });

        expect(issueAction.withGif(true)).toEqual({
            payload: true,
            type: "WITH_GIF"
        });

        expect(issueAction.withScreenshots(false)).toEqual({
            payload: false,
            type: "WITH_SCREENSHOTS"
        });

        expect(issueAction.disableCreateIssue(false)).toEqual({
            payload: false,
            type: "DISABLE_CREATE_ISSUE"
        });

        const link: string = "https://ntp-redmine.krista.ru/";
        expect(issueAction.setLink(link)).toEqual({
            payload: link,
            type: "SET_LINK"
        });

        expect(issueAction.loadScreenshot(true)).toEqual({
            payload: true,
            type: "LOAD_SCREENSHOT"
        });

        const testingDepartment = { value: TestingDepartments.methodology, label: TestingDepartments.methodology };
        expect(issueAction.setTestingDepartment(testingDepartment)).toEqual({
            payload: testingDepartment,
            type: "SET_TESTING_DEPARTMENT"
        });

        const decisionType = { value: DecisionTypes.changeDoc, label: DecisionTypes.changeDoc };
        expect(issueAction.setDecisionType(decisionType)).toEqual({
            payload: decisionType,
            type: "SET_DECISION_TYPE"
        });

        const componentFK = { value: ComponentsFK.administrationC, label: ComponentsFK.administrationC };
        expect(issueAction.setComponentFK(componentFK)).toEqual({
            payload: componentFK,
            type: "SET_COMPONENT_FK"
        });

        expect(issueAction.setByCentralOffice(true)).toEqual({
            payload: true,
            type: "SET_BY_CENTRAL_OFFICE"
        });
    });
});
