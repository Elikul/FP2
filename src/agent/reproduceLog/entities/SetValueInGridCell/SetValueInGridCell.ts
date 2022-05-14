import { ActionEntity } from "../ActionEntity";
import { Types } from "../../../utils/forDefineUIComponents";
import { editCheckbox, editCombobox, editInput } from "../../utils/edit";

/**
 * Ввод значений в ячейки грида
 */
export class SetValueInGridCell extends ActionEntity {
    isEntity(): boolean {
        return (
            (this.record.type === Types.change ||
                this.record.type === Types.blur ||
                this.record.type === Types.checked ||
                this.record.type === Types.unchecked) &&
            this.record.gridCellRow !== undefined &&
            this.record.gridCellCol !== undefined &&
            this.record.value !== undefined
        );
    }

    act(): boolean {
        const rowEl = document.querySelector(`tr[row="${this.record.gridCellRow}"]`);
        if (!rowEl) return false;

        const col = document.querySelector(`th[title="${this.record.gridCellCol}"]`)?.getAttribute("col");
        const colEl = Array.from(rowEl.children).find(el => el.getAttribute("col") === col) as HTMLElement | null;
        if (!colEl) return false;

        colEl.click();
        (document.querySelector('div[title="Редактировать запись"]') as HTMLElement).click();

        const edit =
            editInput(colEl, this.record) || editCheckbox(colEl, this.record) || editCombobox(colEl, this.record);

        return !!edit;
    }

    getSelectorToDisappearEl(): string | null {
        return "div[class=waiting-container]";
    }

    getMsgErr(): string {
        return `Ошибка ввода "${this.record.value}" в строку - "${this.record.gridCellRow}",\n столбец - "${this.record.gridCellCol}",\n grid - "${this.record.grid}"`;
    }
}
