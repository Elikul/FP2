import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ClearFilterParameter } from "./ClearFilterParameter";

describe("Проверить генерацию кода для очистки поле фильтра (ClearFilterParameter)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1616667289306,
        filterCaption: "Код",
        filterToolbar: undefined,
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: true,
        nameForm: "Предметные классы",
        quickFilter: undefined,
        tab: "Предметные классы",
        type: "change",
        value: "",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[3]/DIV[1]/DIV[2]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/INPUT[1]",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults();

    const inputCurDataObjectPanel: IUserActionType = defaults({
        tab: "Классификация",
        tabContainer: "TCD_Details"
    });

    const inputPrevDataObjectFilterTrue: IUserActionType = defaults({
        date: 1616667286201,
        isFilter: true,
        type: "click",
        value: undefined
    });

    const inputPrevDataObjectFilterFalse: IUserActionType = defaults({
        date: 1616667286201,
        isFilter: false,
        type: "set active",
        value: undefined
    });

    const outputCode: string = `filter_pred_klas.getFilterParameter("Код").clearInputParameter();`;

    const outputCodeWithPrevForm: string = [
        `form_pred_klas.getSplitter().open();`,
        `FilterPanel filter_pred_klas = form_pred_klas.getFilterPanel().resetFilter();`,
        `filter_pred_klas.getFilterParameter("Код").clearInputParameter();`
    ].join("\n");

    const outputCodeWithPrevCodePanel: string = [
        `form_pred_klas.getSplitter().open();`,
        `Panel panel_klas = form_pred_klas.getTabControl("TCD_Details").activateTab("Классификация");`,
        `FilterPanel filter_klas = panel_klas.getFilterPanel().resetFilter();`,
        `filter_klas.getFilterParameter("Код").clearInputParameter();`
    ].join("\n");

    it("Должно выполняться условие для сущности ClearFilterParameter", () => {
        expect(new ClearFilterParameter(inputCurDataObjectForm, inputPrevDataObjectFilterTrue).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код ClearFilterParameter", () => {
        expect(new ClearFilterParameter(inputCurDataObjectForm, inputPrevDataObjectFilterTrue).getCode()).toBe(
            outputCode
        );
    });

    it("Должен выдавать код ClearFilterParameter с до кодом открытия вкладки фильтра формы", () => {
        expect(new ClearFilterParameter(inputCurDataObjectForm, inputPrevDataObjectFilterFalse).getCode()).toBe(
            outputCodeWithPrevForm
        );
    });

    it("Должен выдавать код ClearFilterParameter с до кодом открытия вкладки фильтра вложенного таба", () => {
        expect(new ClearFilterParameter(inputCurDataObjectPanel, inputPrevDataObjectFilterFalse).getCode()).toBe(
            outputCodeWithPrevCodePanel
        );
    });
});
