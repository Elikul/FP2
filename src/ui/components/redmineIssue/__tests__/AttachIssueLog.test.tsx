import { cleanup, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { myIssueState } from "../../utils/test_util";
import { ISessionData, IUserActionType } from "../../../../indexedDB/indexeddb";
import AttachIssueLog from "../AttachIssueLog";
import dayjs from "dayjs";
import { PriorityOfIssue, TrackerIssue } from "../../../../Redmine/redmineTypes";

const log: IUserActionType[] = [
    {
        date: 1625821836873,
        dfdNameForm: "FD_ExchangeImport",
        isFilter: false,
        nameForm: "Журнал импорта",
        navigator: 'Обмен электронными документами","Журнал импорта","',
        tabContainer: "node1",
        type: "open"
    }
];

const session: ISessionData[] = [
    {
        dateOfStart: 1618215571000,
        dateOfEnd: 1618215571079,
        title: dayjs(1618215571079).format("DD-MM-YYYY HH:mm:ss"),
        generatedCode: [],
        log: log,
        screenshots: [],
        recordUrl: ""
    }
];

describe("Attach issue log component", function() {
    afterEach(cleanup);

    it("Должен отображать на форме лог пользовательских действий", function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <AttachIssueLog />)({
                SessionState: {
                    currentSession: 0,
                    sessionData: session,
                    startSessionDate: 1618215571051,
                    stopSessionDate: 1618215571079
                },
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    issueLog: log,
                    issueTracker: { value: TrackerIssue.error, label: "Ошибка" },
                    issuePriority: { value: PriorityOfIssue.low, label: "Низкий" },
                    selectedProject: { value: 2, label: "Платформа" }
                }
            })
        );

        const textarea = getByTestId("textarea-log") as HTMLTextAreaElement;
        expect(textarea.value).toEqual(JSON.stringify(log));
    });
});
