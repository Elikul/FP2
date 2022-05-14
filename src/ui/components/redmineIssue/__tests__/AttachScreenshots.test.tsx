import { cleanup, fireEvent, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { myIssueState } from "../../utils/test_util";
import { ISessionData, IUserActionType } from "../../../../indexedDB/indexeddb";
import dayjs from "dayjs";
import AttachScreenshots from "../AttachScreenshots";
import { PriorityOfIssue, TrackerIssue } from "../../../../Redmine/redmineTypes";

const log: IUserActionType[] = [
    {
        date: 1630315684349,
        dfdNameForm: "FD_Replacement",
        isFilter: false,
        nameForm: "Выполнение пакетной замены",
        navigator: 'Пакетная замена","Выполнение пакетной замены","',
        tab: "Препятствующие документы",
        tabContainer: "node1",
        type: "open"
    },
    {
        date: 1630315684387,
        dfdNameForm: undefined,
        isFilter: false,
        nameForm: "Выполнение пакетной замены",
        navigator: undefined,
        tab: "Выполнение пакетной замены",
        tabContainer: "node1",
        type: "set active"
    }
];

const IMG_SRC: string =
    "https://images.pexels.com/photos/2575279/pexels-photo-2575279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const session: ISessionData[] = [
    {
        dateOfStart: 1618215571000,
        dateOfEnd: 1618215571079,
        title: dayjs(1618215571079).format("DD-MM-YYYY HH:mm:ss"),
        generatedCode: [],
        log: log,
        screenshots: [{ screenshot: IMG_SRC, date: 161821557101 }],
        recordUrl: ""
    }
];

describe("Attach screenshots component", function() {
    afterEach(cleanup);

    it("Должен отображать скриншоты на форме, сделанные во время записи пользовательских действий", function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <AttachScreenshots />)({
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
                    selectedProject: { value: 2, label: "Платформа" },
                    screenshots: [
                        { date: 1629364547096, screenshot: IMG_SRC },
                        { date: 1629364549109, screenshot: IMG_SRC }
                    ]
                }
            })
        );

        const image0 = getByTestId("screenshot0") as HTMLElement;
        const image1 = getByTestId("screenshot1") as HTMLElement;

        expect(image0.getAttribute("src")).toEqual(IMG_SRC);
        expect(image0.getAttribute("alt")).toEqual(dayjs(1629364547096).format("DD-MM-YYYY HH:mm:ss"));

        expect(image1.getAttribute("src")).toEqual(IMG_SRC);
        expect(image1.getAttribute("alt")).toEqual(dayjs(1629364549109).format("DD-MM-YYYY HH:mm:ss"));

        //удаляем оба скриншота
        fireEvent.click(getByTestId("delete-screenshot0"));
        //после удаления прошлого скриншота этот с индексом 1 станет с 0 индексом
        fireEvent.click(getByTestId("delete-screenshot0"));

        expect(image0).not.toBeInTheDocument();
        expect(image1).not.toBeInTheDocument();
    });
});
