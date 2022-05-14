import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//нажатие кнопок toolbox грида
export class ClickToolboxGridButton extends CodeEntity {
    //получить текущий грид
    getPrevCode(): string {
        if (this.prevRecord?.grid === undefined || this.record.grid !== this.prevRecord?.grid) {
            if (this.record?.gridToolbar === "Редактировать запись") {
                return [
                    `Grid grid_${this.record.grid} = GridUtils.getGridByTabName(form_${this.form_name},"${this.record.tab}");`,
                    `GridToolbox toolbox_${this.record.grid} = grid_${this.record.grid}.toolbox();`,
                    `GridRow row_${this.nextRecord?.gridCellRow} = grid_${this.nextRecord?.grid}.findRowByIndex(${this.nextRecord?.gridCellRow});\n`
                ].join("\n");
            }
            return [
                `Grid grid_${this.record.grid} = GridUtils.getGridByTabName(form_${this.form_name},"${this.record.tab}");`,
                `GridToolbox toolbox_${this.record.grid} = grid_${this.record.grid}.toolbox();\n`
            ].join("\n");
        }
        if (this.record?.gridToolbar === "Редактировать запись" && this.nextRecord?.gridCellRow !== undefined) {
            return `GridRow row_${this.nextRecord?.gridCellRow} = grid_${this.nextRecord?.grid}.findRowByIndex(${this.nextRecord?.gridCellRow});\n`;
        }
        return "";
    }

    isEntity(): boolean {
        return this.record.gridToolbar !== undefined && this.record.type === Types.click;
    }

    getCode(): string {
        const methodMaps: Map<string | undefined, string> = new Map([
            ["Быстрый фильтр", "quickFilter();"],
            ["Добавить запись", "addRow();"],
            ["Обновить данные", "refresh();"],
            ["Редактировать запись", `editRow(row_${this.nextRecord?.gridCellRow});`],
            ["Удалить запись", "deleteRow();"],
            ["Принять изменения", "commit();"],
            ["Отменить изменения", "rollback();"],
            ["К первой странице", "firstPage();"],
            ["К предыдущей странице", "prevPage();"],
            ["К следующей странице", "nextPage();"],
            ["К последней странице", "lastPage();"],
            ["К предыдущей записи", "prevRow();"],
            ["К следующей записи", "nextRow();"],
            ["Режим карточки", "useCardMode();"]
        ]);
        if (methodMaps.has(this.record.gridToolbar)) {
            return this.getPrevCode() + `toolbox_${this.record.grid}.${methodMaps.get(this.record.gridToolbar)}`;
        } else return "";
    }
}
