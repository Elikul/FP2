import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { RefreshTab } from "./RefreshTab";

describe("Проверить генерацию кода для обновления вкладки (RefreshTab)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616749280085,
        dfdNameForm: "Сотрудники",
        isFilter: false,
        nameForm: "Сотрудники",
        navigator: undefined,
        tab: "Сотрудники",
        tabContainer: "node2",
        type: "refresh",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults();

    const inputCurDataObjectPanel: IUserActionType = defaults({
        tab: "История задач",
        tabContainer: "TCD_SystemDetail"
    });

    const inputPrevDataObject: IUserActionType = defaults({
        date: 1616749270619,
        type: "minimize"
    });

    const outputCode: string = `mainPage.getWorkArea().refresh();`;
    const outputCodeWithPrevCode: string = [
        `form_sotr.getTabControl("TCD_SystemDetail").activateTab("История задач");`,
        `form_sotr.getTabControl("TCD_SystemDetail").refresh();`
    ].join("\n");

    it("Должно выполниться условие для сущности RefreshTab формы", () => {
        expect(new RefreshTab(inputCurDataObjectForm, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должно выполниться условие для сущности RefreshTab вложенного таба", () => {
        expect(new RefreshTab(inputCurDataObjectPanel, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код RefreshTab для формы", () => {
        expect(new RefreshTab(inputCurDataObjectForm, inputPrevDataObject).getCode()).toBe(outputCode);
    });

    it("Должен выдать код RefreshTab для вложенного таба", () => {
        expect(new RefreshTab(inputCurDataObjectPanel, inputPrevDataObject).getCode()).toBe(outputCodeWithPrevCode);
    });
});
