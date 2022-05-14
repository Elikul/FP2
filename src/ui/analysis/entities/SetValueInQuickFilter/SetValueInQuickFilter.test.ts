import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { SetValueInQuickFilter } from "./SetValueInQuickFilter";

describe("Проверить генерацию кода для ввода в быстрый фильтр (SetValueInQuickFilter)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1616753619563,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: "GD_ReplacementConfiguration",
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: false,
        nameForm: "Конфигурация пакетной замены",
        quickFilter: "Генерация",
        tab: "Конфигурация пакетной замены",
        type: "change",
        value: "Формирование уточнений",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/TABLE[4]/TBODY[1]/TR[3]/TD[5]/DIV[1]/DIV[1]/INPUT[1]",
        ...props
    });

    const inputCurDataObject: IUserActionType = defaults();

    const inputPrevDataObjectGridWas: IUserActionType = defaults({
        date: 1616669453504,
        quickFilter: undefined,
        type: "blur",
        value: "Вид расхода",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/TABLE[4]/TBODY[1]/TR[3]/TD[2]/DIV[1]/DIV[1]/INPUT[1]"
    });

    const inputPrevDataObjectGridWasNot: IUserActionType = defaults({
        date: 1616669453504,
        grid: undefined,
        quickFilter: undefined,
        type: "click",
        value: undefined
    });

    const outputCode: string = [
        `GridRow filterRow_GD_ReplacementConfiguration = grid_GD_ReplacementConfiguration.getFilterRow();`,
        `GridUtils.setColumnValueInRow("Формирование уточнений", grid_GD_ReplacementConfiguration, filterRow_GD_ReplacementConfiguration,"Генерация");`
    ].join("\n");
    const outputCodeWithPrevCode: string = [
        `Grid grid_GD_ReplacementConfiguration = GridUtils.getGridByTabName(form_konf_pake_zame,"Конфигурация пакетной замены");`,
        `GridToolbox toolbox_GD_ReplacementConfiguration = grid_GD_ReplacementConfiguration.toolbox();`,
        `toolbox_GD_ReplacementConfiguration.quickFilter();`,
        `GridRow filterRow_GD_ReplacementConfiguration = grid_GD_ReplacementConfiguration.getFilterRow();`,
        `GridUtils.setColumnValueInRow("Формирование уточнений", grid_GD_ReplacementConfiguration, filterRow_GD_ReplacementConfiguration,"Генерация");`
    ].join("\n");

    it("Должно выполняться условие для сущности SetValueInQuickFilter", () => {
        expect(new SetValueInQuickFilter(inputCurDataObject, inputPrevDataObjectGridWas).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код SetValueInQuickFilter", () => {
        expect(new SetValueInQuickFilter(inputCurDataObject, inputPrevDataObjectGridWas).getCode()).toBe(outputCode);
    });

    it("Должен выдавать код SetValueInQuickFilter с до кодом получения грида", () => {
        expect(new SetValueInQuickFilter(inputCurDataObject, inputPrevDataObjectGridWasNot).getCode()).toBe(
            outputCodeWithPrevCode
        );
    });
});
