import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//очистить ячейку грида
export class ClearGridCell extends CodeEntity {
    //получить текущий грид и метод редактирования ячейки грида
    getPrevCode(): string {
        if (
            (this.prevRecord?.grid === undefined || this.record.grid !== this.prevRecord?.grid) &&
            this.prevRecord?.modalWindow === undefined
        )
            return [
                `Grid grid_${this.record.grid} = GridUtils.getGridByTabName(form_${this.form_name},"${this.record.tab}");`,
                `GridToolbox toolbox_${this.record.grid} = grid_${this.record.grid}.toolbox();`,
                `GridRow row_${this.record.gridCellRow} = grid_GD_ReplacementConfiguration.findRowByIndex(${this.record.gridCellRow});`,
                `toolbox_${this.record.grid}.editRow(row_${this.record.gridCellRow});\n`
            ].join("\n");

        if (
            this.prevRecord?.gridToolbar !== "Добавить запись" &&
            this.prevRecord?.gridToolbar !== "Редактировать запись" &&
            (this.prevRecord?.gridCellRow !== this.record.gridCellRow || this.prevRecord?.gridCellRow === undefined) &&
            this.prevRecord?.modalWindow === undefined
        )
            return [
                `GridRow row_${this.record.gridCellRow} = grid_GD_ReplacementConfiguration.findRowByIndex(${this.record.gridCellRow});`,
                `toolbox_${this.record.grid}.editRow(row_${this.record.gridCellRow});\n`
            ].join("\n");
        return "";
    }

    isEntity(): boolean {
        return (
            (this.record.type === Types.change || this.record.type === Types.blur) &&
            this.record.gridCellRow !== undefined &&
            this.record.gridCellCol !== undefined &&
            this.record.value === ""
        );
    }

    getCode(): string {
        return (
            this.getPrevCode() +
            `GridUtils.clearColumnValueInSelectedRow(grid_${this.record.grid}, "${this.record.gridCellCol}");`
        );
    }
}
