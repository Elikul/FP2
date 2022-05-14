import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ClearGridCell } from "./ClearGridCell";

describe("Проверить генерацию кода для очистки ячейки грида (ClearGridCell)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1616669455426,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: "GD_DomainClassInfo",
        gridCellCol: "Наименование",
        gridCellRow: "3",
        gridToolbar: undefined,
        isFilter: false,
        nameForm: "Предметные классы",
        quickFilter: undefined,
        tab: "Предметные классы",
        type: "change",
        value: "",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/TABLE[3]/TBODY[1]/TR[7]/TD[4]/DIV[1]/DIV[1]/INPUT[1]",
        ...props
    });

    const inputCurDataObject: IUserActionType = defaults();

    const inputPrevDataObjectGridWas: IUserActionType = defaults({
        date: 1616669453504,
        type: "change",
        value: "Вид расхода"
    });

    const inputPrevDataObjectGridWasNot: IUserActionType = defaults({
        date: 1616669453504,
        grid: undefined,
        type: "set active",
        value: undefined
    });

    const outputCode: string = `GridUtils.clearColumnValueInSelectedRow(grid_GD_DomainClassInfo, "Наименование");`;
    const outputCodeWithPrevCode: string = [
        `Grid grid_GD_DomainClassInfo = GridUtils.getGridByTabName(form_pred_klas,"Предметные классы");`,
        `GridToolbox toolbox_GD_DomainClassInfo = grid_GD_DomainClassInfo.toolbox();`,
        `GridRow row_3 = grid_GD_ReplacementConfiguration.findRowByIndex(3);`,
        `toolbox_GD_DomainClassInfo.editRow(row_3);`,
        `GridUtils.clearColumnValueInSelectedRow(grid_GD_DomainClassInfo, "Наименование");`
    ].join("\n");

    it("Должно выполняться условие для сущности ClearGridCell", () => {
        expect(new ClearGridCell(inputCurDataObject, inputPrevDataObjectGridWas).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код ClearGridCell", () => {
        expect(new ClearGridCell(inputCurDataObject, inputPrevDataObjectGridWas).getCode()).toEqual(outputCode);
    });

    it("Должен выдавать код ClearGridCell с до кодом получения грида", () => {
        expect(new ClearGridCell(inputCurDataObject, inputPrevDataObjectGridWasNot).getCode()).toEqual(
            outputCodeWithPrevCode
        );
    });
});
