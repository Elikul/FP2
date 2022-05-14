import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { SetValueInGridCell } from "./SetValueInGridCell";

describe("Проверить генерацию кода для ввода в ячейку грида (SetValueInGridCell)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1616751326486,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: "GD_ReplacementConfiguration",
        gridCellCol: "Минимальная сила препятствующих документов",
        gridCellRow: "15",
        gridToolbar: undefined,
        isFilter: false,
        nameForm: "Конфигурация пакетной замены",
        quickFilter: undefined,
        tab: "Конфигурация пакетной замены",
        type: "blur",
        value: "100",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/TABLE[3]/TBODY[1]/TR[5]/TD[6]/DIV[1]/DIV[1]/INPUT[1]",
        ...props
    });

    const inputCurDataObject: IUserActionType = defaults();

    const inputPrevDataObjectGridWas: IUserActionType = defaults({
        date: 1616751310793,
        gridCellCol: "Предметный класс",
        gridCellRow: "14",
        type: "change",
        value: "27 09",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/TABLE[3]/TBODY[1]/TR[18]/TD[4]/DIV[1]/DIV[1]/INPUT[1]"
    });

    const inputPrevDataObjectGridWasNot: IUserActionType = defaults({
        date: 1616751310793,
        nameForm: "Стартовая страница",
        tab: "Стартовая страница",
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        type: "set active",
        value: undefined,
        xpath: undefined
    });

    const inputPrevDataObjectWasAdd: IUserActionType = defaults({
        date: 1616751310793,
        gridCellRow: undefined,
        gridToolbar: "Добавить запись",
        type: "click",
        value: undefined,
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[6]"
    });

    const outputCodeWithPrevCodeEdit: string = [
        `GridRow row_15 = grid_GD_ReplacementConfiguration.findRowByIndex(15);`,
        `toolbox_GD_ReplacementConfiguration.editRow(row_15);`,
        `GridUtils.setColumnValueInSelectedRow("100", grid_GD_ReplacementConfiguration, "Минимальная сила препятствующих документов");`
    ].join("\n");
    const outputCodeWithPrevCodeGrid: string = [
        `Grid grid_GD_ReplacementConfiguration = GridUtils.getGridByTabName(form_konf_pake_zame,"Конфигурация пакетной замены");`,
        `GridToolbox toolbox_GD_ReplacementConfiguration = grid_GD_ReplacementConfiguration.toolbox();`,
        `GridRow row_15 = grid_GD_ReplacementConfiguration.findRowByIndex(15);`,
        `toolbox_GD_ReplacementConfiguration.editRow(row_15);`,
        `GridUtils.setColumnValueInSelectedRow("100", grid_GD_ReplacementConfiguration, "Минимальная сила препятствующих документов");`
    ].join("\n");
    const outputCodeWhenAdd: string = `GridUtils.setColumnValueInSelectedRow("100", grid_GD_ReplacementConfiguration, "Минимальная сила препятствующих документов");`;

    it("Должно выполняться условие для сущности SetValueInGridCell", () => {
        expect(new SetValueInGridCell(inputCurDataObject, inputPrevDataObjectGridWas).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код SetValueInGridCell c до методом редактирования строки", () => {
        expect(new SetValueInGridCell(inputCurDataObject, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeWithPrevCodeEdit
        );
    });

    it("Должен выдавать код SetValueInGridCell с до кодом получения грида и методом редактирования строки", () => {
        expect(new SetValueInGridCell(inputCurDataObject, inputPrevDataObjectGridWasNot).getCode()).toBe(
            outputCodeWithPrevCodeGrid
        );
    });

    it("Должен выдавать код SetValueInGridCell при добавление новой записи", () => {
        expect(new SetValueInGridCell(inputCurDataObject, inputPrevDataObjectWasAdd).getCode()).toBe(outputCodeWhenAdd);
    });
});
