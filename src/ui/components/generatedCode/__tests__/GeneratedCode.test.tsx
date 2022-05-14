import { cleanup, render } from "@testing-library/react";
import GeneratedCode from "../GeneratedCode";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { ISessionData, IUserActionType } from "../../../../indexedDB/indexeddb";
import { ApplyModalWindow } from "../../../analysis/entities/ApplyModalWindow";

describe("GeneratedCode component", () => {
    afterEach(cleanup);

    const DataObject: IUserActionType = {
        bigButton: undefined,
        date: 1619008037536,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: false,
        modalWindow: "Параметры наполнения",
        modalWindowButton: "Применить",
        nameForm: "Задачи сбора отчетности",
        quickFilter: undefined,
        tab: undefined,
        type: "click",
        value: undefined,
        xpath: "/HTML[1]/BODY[1]/DIV[8]/DIV[2]/DIV[3]/BUTTON[1]"
    };

    const session: ISessionData[] = [
        {
            dateOfStart: 1618215990003,
            dateOfEnd: 1618215990023,
            title: "Текущая",
            generatedCode: [new ApplyModalWindow(DataObject).getCode()],
            log: [DataObject],
            screenshots: []
        }
    ];

    it("Должен выводить сгенерированный код", function() {
        const { queryByText } = render(
            ProviderWithComponent(() => <GeneratedCode />)({
                MainState: {
                    connectAgent: true,
                    isLoading: true
                },
                SessionState: {
                    currentSession: 0,
                    sessionData: session,
                    startSessionDate: 0,
                    stopSessionDate: 0
                }
            })
        );
        expect(
            queryByText(`mainPage.getModalWindow("Параметры наполнения").waitForLoadingWindow().ok();`)
        ).toBeInTheDocument();
    });
});
