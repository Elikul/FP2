import fetchMock from "jest-fetch-mock";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { myIssueState, testProjects } from "../../utils/test_util";
import { IUserActionType } from "../../../../indexedDB/indexeddb";
import * as Actions from "../../../util/inspectWindow/sendMessageAgentHandler";
import CreateIssues from "../CreateIssues";
import dayjs from "dayjs";

const spy = jest.spyOn(Actions, "default");

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

const IMG_SRC: string =
    "https://images.pexels.com/photos/2575279/pexels-photo-2575279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

describe("Create issue component", function() {
    beforeAll(() => {
        fetchMock.resetMocks();
    });

    afterEach(cleanup);

    it("Открывать окно создании задачи в Redmine", async function() {
        fetchMock.mockResponse(JSON.stringify({ projects: testProjects }));

        const component = render(
            ProviderWithComponent(() => <CreateIssues />)({
                MainState: {
                    connectAgent: true,
                    isLoading: false
                },
                SessionState: {
                    currentSession: 0,
                    sessionData: [
                        {
                            dateOfStart: 121312391248,
                            dateOfEnd: 13213214214909,
                            log: log,
                            generatedCode: [
                                'mainPage.getNavigator().openForm("Обмен электронными документами","Журнал импорта").waitForLoadingWindow();'
                            ],
                            title: dayjs(13213214214909).format("DD-MM-YYYY HH:mm:ss"),
                            screenshots: [],
                            recordUrl:
                                "data:video/webm;base64,GkXfo6NChoEBQveBAULygQRC84EIQoKIbWF0cm9za2FCh4EEQoWBAhhTgGcB/"
                        }
                    ],
                    startSessionDate: 121312391248,
                    stopSessionDate: 13213214214921
                },
                IssueState: {
                    ...myIssueState,
                    issueLog: log,
                    screenshots: [{ date: 121312391248, screenshot: IMG_SRC }]
                }
            })
        );

        //открытие модульного окна для создания задачи в Redmine
        fireEvent.click(await component.findByTestId("btn-open-task-window"));
        expect(await component.findByTestId("form")).toBeInTheDocument();
        spy.mockReset();
    });
});
