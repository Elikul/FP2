import issueReducer from "../IssueReducer";
import * as Action from "../../actions/issueAction";
import { InfoScreenshot, IUserActionType } from "../../../indexedDB/indexeddb";
import { IOption } from "../../../Redmine/utilsRedmine";
import { AttachFilesType } from "../../components/redmineIssue/AttachFiles";
import { PriorityOfIssue, TrackerIssue } from "../../../Redmine/redmineTypes";
import { ComponentsFK, DecisionTypes, TestingDepartments } from "../../../Redmine/redmineProjects/fk-asp";

const IMG_SRC: string = "image.png";

const VIDEO_URL: string = "video_2341.mp4";

const GIF_URL: string = "gif_0213.gif";

const API_KEY: string = "74ed5fe647fd4642ab2b63d3fa026ade9c32a445";

describe("IssueReducer", () => {
    const screenshot1: InfoScreenshot = {
        screenshot: IMG_SRC,
        date: 1634208661597
    };

    const attachingFile1: AttachFilesType = { file: new File([IMG_SRC], "file1.png"), src: IMG_SRC };

    const initialState = {
        apikey: null,
        screenshots: [screenshot1],
        showModalCreateIssue: false,
        issueLog: [],
        issueTracker: null,
        issuePriority: null,
        selectedProject: null,
        selectedMember: null,
        attachments: [attachingFile1],
        stateOpenScreenshot: false,
        stateOpenLog: false,
        video: null,
        gif: null,
        stateWithVideo: false,
        stateWithGif: false,
        stateWithScreenshots: false,
        disableCreateIssue: false,
        link: "",
        isLoadScreenshot: false,
        testingDepartment: null,
        decisionType: null,
        componentFK: null,
        byCentralOffice: false
    };

    const screenshot2: InfoScreenshot = {
        screenshot: IMG_SRC,
        date: 1633963821552
    };

    it("Должен менять состояния", () => {
        expect(issueReducer(initialState, Action.setApiKey(API_KEY))).toEqual({
            ...initialState,
            apikey: API_KEY
        });

        expect(issueReducer(initialState, Action.getApiKey())).toEqual({
            ...initialState,
            apikey: API_KEY
        });

        expect(issueReducer(initialState, Action.setScreenshots(screenshot2))).toEqual({
            ...initialState,
            screenshots: [screenshot1, screenshot2]
        });

        expect(issueReducer(initialState, Action.removeScreenshot([screenshot1]))).toEqual({
            ...initialState,
            screenshots: [screenshot1]
        });

        expect(issueReducer(initialState, Action.removeAllScreenshots())).toEqual({
            ...initialState,
            screenshots: []
        });

        expect(issueReducer(initialState, Action.showModalCreateIssue(true))).toEqual({
            ...initialState,
            showModalCreateIssue: true
        });

        const log: IUserActionType[] = [
            {
                date: 1629708188338,
                dfdNameForm: undefined,
                isFilter: false,
                nameForm: "Выполнение пакетной замены",
                navigator: undefined,
                tab: "Выполнение пакетной замены",
                tabContainer: "node1",
                type: "set active"
            }
        ];
        expect(issueReducer(initialState, Action.setIssueLog(log))).toEqual({
            ...initialState,
            issueLog: log
        });

        const tracker = { value: TrackerIssue.error, label: "Ошибка" };
        expect(issueReducer(initialState, Action.setIssueTracker(tracker))).toEqual({
            ...initialState,
            issueTracker: tracker
        });

        const priority = { value: PriorityOfIssue.urgent, label: "Срочный" };
        expect(issueReducer(initialState, Action.setIssuePriority(priority))).toEqual({
            ...initialState,
            issuePriority: priority
        });

        const project: IOption = { value: 104, label: "РИД" };
        expect(issueReducer(initialState, Action.setRedmineProject(project))).toEqual({
            ...initialState,
            selectedProject: project
        });

        const member: IOption = { value: 1432, label: "Иванов Иван" };
        expect(issueReducer(initialState, Action.setMember(member))).toEqual({
            ...initialState,
            selectedMember: member
        });

        const attachingFile2: AttachFilesType = { file: new File([IMG_SRC], "file2.png"), src: IMG_SRC };

        expect(issueReducer(initialState, Action.attachFiles(attachingFile2))).toEqual({
            ...initialState,
            attachments: [attachingFile1, attachingFile2]
        });

        expect(issueReducer(initialState, Action.removeAttachmentFiles([attachingFile2]))).toEqual({
            ...initialState,
            attachments: [attachingFile2]
        });

        expect(issueReducer(initialState, Action.removeAllAttachments())).toEqual({
            ...initialState,
            attachments: []
        });

        expect(issueReducer(initialState, Action.showScreenshots(true))).toEqual({
            ...initialState,
            stateOpenScreenshot: true
        });

        expect(issueReducer(initialState, Action.showLog(true))).toEqual({
            ...initialState,
            stateOpenLog: true
        });

        const VideoFile: File = new File([VIDEO_URL], "video.mp4");
        const GifFile: File = new File([GIF_URL], "gif.gif");

        expect(issueReducer(initialState, Action.setVideo(VideoFile))).toEqual({
            ...initialState,
            video: VideoFile
        });

        expect(issueReducer(initialState, Action.setGif(GifFile))).toEqual({
            ...initialState,
            gif: GifFile
        });

        expect(issueReducer(initialState, Action.withVideo(true))).toEqual({
            ...initialState,
            stateWithVideo: true
        });

        expect(issueReducer(initialState, Action.withGif(false))).toEqual({
            ...initialState,
            stateWithGif: false
        });

        expect(issueReducer(initialState, Action.withScreenshots(true))).toEqual({
            ...initialState,
            stateWithScreenshots: true
        });

        expect(issueReducer(initialState, Action.disableCreateIssue(true))).toEqual({
            ...initialState,
            disableCreateIssue: true
        });

        const link: string = "https://ntp-redmine.krista.ru/";
        expect(issueReducer(initialState, Action.setLink(link))).toEqual({
            ...initialState,
            link: link
        });

        expect(issueReducer(initialState, Action.loadScreenshot(true))).toEqual({
            ...initialState,
            isLoadScreenshot: true
        });

        const testingDepartment = { value: TestingDepartments.development, label: TestingDepartments.development };
        expect(issueReducer(initialState, Action.setTestingDepartment(testingDepartment))).toEqual({
            ...initialState,
            testingDepartment: testingDepartment
        });

        const decisionType = { value: DecisionTypes.settingPrivilege, label: DecisionTypes.settingPrivilege };
        expect(issueReducer(initialState, Action.setDecisionType(decisionType))).toEqual({
            ...initialState,
            decisionType: decisionType
        });

        const componentFK = { value: ComponentsFK.analysisRskA, label: ComponentsFK.analysisRskA };
        expect(issueReducer(initialState, Action.setComponentFK(componentFK))).toEqual({
            ...initialState,
            componentFK: componentFK
        });

        expect(issueReducer(initialState, Action.setByCentralOffice(false))).toEqual({
            ...initialState,
            byCentralOffice: false
        });
    });
});
