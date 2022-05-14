import { ActionEntity } from "../ActionEntity";
import { Types } from "../../../utils/forDefineUIComponents";
import { editCheckbox, editCombobox, editInput } from "../../utils/edit";

/**
 * Ввод значений в поля быстрого фильтра
 */
export class SetValueInQuickFilter extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.quickFilter !== undefined &&
            (this.record.type === Types.change ||
                this.record.type === Types.blur ||
                this.record.type === Types.checked ||
                this.record.type === Types.unchecked) &&
            this.record.value !== undefined
        );
    }

    act(): boolean {
        let edit: Element | null = null;
        const col = document.querySelector(`th[title="${this.record.quickFilter}"]`)?.getAttribute("col");
        const filterRow = document.querySelectorAll(`tr[class="filter"]`)[2];
        if (!filterRow) return false;
        const filterCol = Array.from(filterRow?.children)?.find(el => el?.getAttribute("col") === col);
        if (!filterCol) return false;

        edit =
            editInput(filterCol, this.record) ||
            editCheckbox(filterCol, this.record) ||
            editCombobox(filterCol, this.record);

        if (!edit) return false;

        if (this.nextRecord?.quickFilter === undefined) {
            edit.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 13 }));
        }

        return true;
    }

    getMsgErr(): string {
        return `Ошибка ввода "${this.record.value}" в быстрый фильтр,\n столбец - "${this.record.quickFilter}"`;
    }
}
