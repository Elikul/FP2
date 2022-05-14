import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ApplyFilter } from "./ApplyFilter";

describe("Проверить генерацию кода для принятия фильтра(ApplyFilter)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616580570305,
        dfdNameForm: undefined,
        isFilter: true,
        nameForm: "Выполнение пакетной замены",
        navigator: undefined,
        tab: "Выполнение пакетной замены",
        type: "slamming",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults({
        date: 1616581405876,
        filterToolbar: "Применить фильтр",
        type: "click",
        xpath: "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]"
    });

    const inputCurDataObjectPanel: IUserActionType = defaults({
        date: 1616581405876,
        filterToolbar: "Применить фильтр",
        tab: "Наборы классификации",
        tabContainer: "TCD_Details",
        type: "click",
        xpath: "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]"
    });

    const inputPrevDataObjectFilterTrue: IUserActionType = defaults();

    const inputPrevDataObjectFilterFalse: IUserActionType = defaults({
        date: 1616580566233,
        isFilter: false,
        type: "set active"
    });

    const outputCode: string = `filter_vypo_pake_zame.applyFilter();`;

    const outputCodeWithPrevCodePanel: string = [
        `form_vypo_pake_zame.getSplitter().open();`,
        `Panel panel_nabo_klas = form_vypo_pake_zame.getTabControl("TCD_Details").activateTab("Наборы классификации");`,
        `FilterPanel filter_nabo_klas = panel_nabo_klas.getFilterPanel();`,
        `filter_nabo_klas.applyFilter();`
    ].join("\n");

    const outputCodeWithPrevCodeForm: string = [
        `form_vypo_pake_zame.getSplitter().open();`,
        `FilterPanel filter_vypo_pake_zame = form_vypo_pake_zame.getFilterPanel();`,
        `filter_vypo_pake_zame.applyFilter();`
    ].join("\n");

    it("Должно выполниться условие для сущности ApplyFilter фильтр формы", () => {
        expect(new ApplyFilter(inputCurDataObjectForm, inputPrevDataObjectFilterTrue).isEntity()).toBeTruthy();
    });

    it("Должно выполниться условие для сущности ApplyFilter фильтр формы", () => {
        expect(new ApplyFilter(inputCurDataObjectForm, inputPrevDataObjectFilterFalse).isEntity()).toBeTruthy();
    });

    it("Должно выполниться условие для сущности ApplyFilter фильтр вложенного таба", () => {
        expect(new ApplyFilter(inputCurDataObjectPanel, inputPrevDataObjectFilterFalse).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код ApplyFilter", () => {
        expect(new ApplyFilter(inputCurDataObjectForm, inputPrevDataObjectFilterTrue).getCode()).toBe(outputCode);
    });

    it("Должен выдавать код ApplyFilter фильтра формы", () => {
        expect(new ApplyFilter(inputCurDataObjectForm, inputPrevDataObjectFilterFalse).getCode()).toBe(
            outputCodeWithPrevCodeForm
        );
    });

    it("Должен выдавать код ApplyFilter с до кодом открытия вкладки фильтра вложенного таба", () => {
        expect(new ApplyFilter(inputCurDataObjectPanel, inputPrevDataObjectFilterFalse).getCode()).toBe(
            outputCodeWithPrevCodePanel
        );
    });
});
