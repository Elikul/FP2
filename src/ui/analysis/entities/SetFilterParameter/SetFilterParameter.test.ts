import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { SetFilterParameter } from "./SetFilterParameter";

describe("Проверить генерацию кода для ввода в поле фильтра (SetFilterParameter)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1616584215765,
        filterCaption: "Предметный класс",
        filterToolbar: undefined,
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: true,
        nameForm: "Конфигурация пакетной замены",
        quickFilter: undefined,
        tab: "Конфигурация пакетной замены",
        type: "change",
        value: "Вид расхода",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults();

    const inputCurDataObjectPanel: IUserActionType = defaults({
        tab: "Бухгалтерские проводки",
        tabContainer: "TCD_Details"
    });

    const inputPrevDataObjectFilterTrue: IUserActionType = defaults({
        date: 1616581405876,
        isFilter: true,
        type: "click",
        value: undefined
    });

    const inputPrevDataObjectFilterFalse: IUserActionType = defaults({
        date: 1616580566233,
        isFilter: false,
        type: "set active"
    });

    const outputCode: string = `filter_konf_pake_zame.getFilterParameter("Предметный класс").setInputParameter("Вид расхода");`;
    const outputCodeWithPrevCodeForm: string = [
        `form_konf_pake_zame.getSplitter().open();`,
        `FilterPanel filter_konf_pake_zame = form_konf_pake_zame.getFilterPanel().resetFilter();`,
        `filter_konf_pake_zame.getFilterParameter("Предметный класс").setInputParameter("Вид расхода");`
    ].join("\n");

    const outputCodeWithPrevCodePanel: string = [
        `form_konf_pake_zame.getSplitter().open();`,
        `Panel panel_buhg_prov = form_konf_pake_zame.getTabControl("TCD_Details").activateTab("Бухгалтерские проводки");`,
        `FilterPanel filter_buhg_prov = panel_buhg_prov.getFilterPanel().resetFilter();`,
        `filter_buhg_prov.getFilterParameter("Предметный класс").setInputParameter("Вид расхода");`
    ].join("\n");

    it("Должно выполняться условие для сущности SetFilterParameter", () => {
        expect(new SetFilterParameter(inputCurDataObjectForm, inputPrevDataObjectFilterTrue).isEntity()).toBeTruthy();
    });

    it("Должно выполняться условие для сущности SetFilterParameter", () => {
        expect(new SetFilterParameter(inputCurDataObjectPanel, inputPrevDataObjectFilterFalse).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код SetFilterParameter", () => {
        expect(new SetFilterParameter(inputCurDataObjectForm, inputPrevDataObjectFilterTrue).getCode()).toBe(
            outputCode
        );
    });

    it("Должен выдавать код SetFilterParameter с до кодом открытия вкладки фильтра формы", () => {
        expect(new SetFilterParameter(inputCurDataObjectForm, inputPrevDataObjectFilterFalse).getCode()).toBe(
            outputCodeWithPrevCodeForm
        );
    });

    it("Должен выдавать код SetFilterParameter с до кодом открытия вкладки фильтра вложенного таба", () => {
        expect(new SetFilterParameter(inputCurDataObjectPanel, inputPrevDataObjectFilterFalse).getCode()).toBe(
            outputCodeWithPrevCodePanel
        );
    });
});
