import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ActivateFilter } from "./ActivateFilter";

describe("Проверить генерацию кода для открытия вкладки фильтра (ActivateFilter)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616661812227,
        dfdNameForm: undefined,
        isFilter: true,
        nameForm: "Выполнение пакетной замены",
        navigator: undefined,
        tab: "Выполнение пакетной замены",
        type: "slamming",
        ...props
    });

    const inputCurDataObjectSlamming: IUserActionType = defaults();

    const inputCurDataObjectActive: IUserActionType = defaults({
        tabContainer: "TCD_Details",
        tab: "Результат замены",
        type: "set active"
    });

    const inputPrevDataObject: IUserActionType = defaults({
        date: 1616661806380,
        isFilter: false,
        type: "click"
    });

    const outputCodeWithForm: string = [
        `form_vypo_pake_zame.getSplitter().open();`,
        `FilterPanel filter_vypo_pake_zame = form_vypo_pake_zame.getFilterPanel().resetFilter();`
    ].join("\n");

    const outputCodeWithPanel: string = [
        `Panel panel_rezu_zame = form_vypo_pake_zame.getTabControl("TCD_Details").activateTab("Результат замены");`,
        `FilterPanel filter_rezu_zame = panel_rezu_zame.getFilterPanel().resetFilter();\n`
    ].join("\n");

    it('Должно выполниться условие для сущности ActivateFilter, когда  type = "slamming" и фильтр формы', () => {
        expect(new ActivateFilter(inputCurDataObjectSlamming, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it('Должен выдать код ActivateFilter, когда  type = "slamming" и фильтр формы', () => {
        expect(new ActivateFilter(inputCurDataObjectSlamming, inputPrevDataObject).getCode()).toBe(outputCodeWithForm);
    });

    it('Должно выполниться условие для сущности ActivateFilter, когда type = "set active" и фильтр вложенного таба', () => {
        expect(new ActivateFilter(inputCurDataObjectActive, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it('Должен выдать код ActivateFilter, когда type = "set active" фильтр вложенного таба', () => {
        expect(new ActivateFilter(inputCurDataObjectActive, inputPrevDataObject).getCode()).toBe(outputCodeWithPanel);
    });
});
