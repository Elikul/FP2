import { cleanup, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import LogTable from "../LogTable";
import { ISessionData, IUserActionType } from "../../../../indexedDB/indexeddb";
import { toFormLog } from "../../../analysis/Logger";

describe("LogTable component", () => {
    afterEach(cleanup);

    const DataObject: IUserActionType[] = [
        {
            bigButton: "Заполнить маппинг настроек формы",
            date: 1616670870805,
            filterCaption: undefined,
            filterToolbar: undefined,
            grid: undefined,
            gridCellCol: undefined,
            gridCellRow: undefined,
            gridToolbar: undefined,
            isFilter: false,
            nameForm: "Предметные классы",
            quickFilter: undefined,
            tab: "Предметные классы",
            type: "click",
            value: undefined,
            xpath:
                "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[1]/DIV[2]/DIV[1]"
        }
    ];

    const session: ISessionData[] = [
        {
            dateOfStart: 1618215990004,
            dateOfEnd: 1618215990023,
            title: "Текущая",
            generatedCode: [],
            log: DataObject,
            screenshots: []
        }
    ];

    it("Должен выводить таблицу логов", function() {
        const { queryByText } = render(
            ProviderWithComponent(() => <LogTable />)({
                SessionState: {
                    currentSession: 0,
                    sessionData: session,
                    startSessionDate: 0,
                    stopSessionDate: 0
                }
            })
        );

        expect(queryByText).not.toBeNull();
        expect(toFormLog(DataObject)).toStrictEqual([
            'Клик по   BigButton title = "Заполнить маппинг настроек формы" Tab title = "Предметные классы"'
        ]);
    });
});
