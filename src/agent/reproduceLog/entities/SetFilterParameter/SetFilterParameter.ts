import { ActionEntity } from "../ActionEntity";
import { Types } from "../../../utils/forDefineUIComponents";
import { editCheckbox, editCombobox, editInput } from "../../utils/edit";

/**
 * Ввод значений в фильтр
 */
export class SetFilterParameter extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.filterCaption !== undefined &&
            (this.record.type === Types.change ||
                this.record.type === Types.blur ||
                this.record.type === Types.checked ||
                this.record.type === Types.unchecked) &&
            this.record.value !== undefined
        );
    }

    act(): boolean {
        const filterPanel = document.querySelector(`div[id="${this.record.tabContainer}"]`);
        if (!filterPanel) return false;
        const filterCaption = document.querySelector(`div[title*="${this.record.filterCaption}"]`);
        const filterRow = filterCaption?.closest('div[class*="propertyTableRow"]');
        if (!filterRow) return false;
        const edit =
            editInput(filterRow, this.record) ||
            editCheckbox(filterRow, this.record) ||
            editCombobox(filterRow, this.record);
        return !!edit;
    }

    getSelectorToDisappearEl(): string | null {
        return "div[class=waiting-container]";
    }

    getMsgErr(): string {
        return `Ошибка ввода "${this.record.value}" в поле фильтра - "${this.record.filterCaption}"`;
    }
}
