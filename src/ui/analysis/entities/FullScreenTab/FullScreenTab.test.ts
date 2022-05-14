import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { FullScreenTab } from "./FullScreenTab";

describe("Проверить генерацию кода для открытия вкладки на полный экран (FullScreenTab)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616747426575,
        dfdNameForm: undefined,
        isFilter: false,
        nameForm: "Перечень бюджетов",
        navigator: undefined,
        tabContainer: "node2",
        tab: "Перечень бюджетов",
        type: "fullscreen",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults();

    const inputCurDataObjectPanel: IUserActionType = defaults({
        tab: "Конфигурация",
        tabContainer: "TCD_SystemDetail"
    });

    const inputPrevDataObject: IUserActionType = defaults({
        date: 1616747426560,
        type: "refresh"
    });

    const outputCode: string = `mainPage.getWorkArea().setMaximized(true);`;
    const outputCodeWithPrevCode: string = [
        `form_pere_byud.getTabControl("TCD_SystemDetail").activateTab("Конфигурация");`,
        `form_pere_byud.getTabControl("TCD_SystemDetail").setMaximized(true);`
    ].join("\n");

    it("Должно выполниться условие для сущности FullScreenTab формы", () => {
        expect(new FullScreenTab(inputCurDataObjectForm, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должно выполниться условие для сущности FullScreenTab вложенного таба", () => {
        expect(new FullScreenTab(inputCurDataObjectPanel, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код FullScreenTab для формы", () => {
        expect(new FullScreenTab(inputCurDataObjectForm, inputPrevDataObject).getCode()).toBe(outputCode);
    });

    it("Должен выдать код FullScreenTab для вложенного таба", () => {
        expect(new FullScreenTab(inputCurDataObjectPanel, inputPrevDataObject).getCode()).toBe(outputCodeWithPrevCode);
    });
});
