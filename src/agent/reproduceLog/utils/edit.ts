import { IUserActionType } from "../../../indexedDB/indexeddb";
import { getChildrenOfObject, Types } from "../../utils/forDefineUIComponents";

/**
 * Ввод в обычное поле или в календарь
 * @param col - столбец грида
 * @param record - текущая запись лога
 */
export const editInput = (col: Element, record: IUserActionType): Element | null => {
    const input = getChildrenOfObject(col, "edit-input") || getChildrenOfObject(col, "datepicker-input");
    if (!input) return null;
    $(input as NodeElements).val(record.value as string);
    return input;
};

/**
 * Поставить/снять флажок в checkbox
 * @param col - столбец грида
 * @param record - текущая запись лога
 */
export const editCheckbox = (col: Element, record: IUserActionType): Element | null => {
    const checkbox = (getChildrenOfObject(col, "checkbox-checkMark") ||
        getChildrenOfObject(col, "grid-checkbox")) as HTMLElement | null;
    if (!checkbox) return null;
    if (record.type === Types.unchecked) {
        checkbox.classList.remove(Types.checked);
        checkbox.classList.add(Types.unchecked);
        checkbox.click();
        checkbox.click();
        return checkbox;
    }
    checkbox.classList.remove(Types.unchecked);
    checkbox.classList.add(Types.checked);
    checkbox.click();
    return checkbox;
};

/**
 * Выбрать значения в multiselect
 * @param record - текущая запись лога
 */
const selectOptions = (record: IUserActionType) => {
    const values: string[] | undefined = record.value?.replace(" m", "").split(", ");

    values?.forEach(value => {
        const checkboxes = document.querySelector('ul[class*="ui-multiselect-checkboxes"]');
        if (!checkboxes) return;
        Array.from(checkboxes.children).forEach(li => {
            const input = li.children[0]?.children[0] as HTMLInputElement;
            if (input?.title === value) {
                input?.click();
            }
        });
    });
    (document.querySelector('a[class*="ui-multiselect-apply"]') as HTMLElement)?.click();
};

/**
 * Выбрать значение(я) из списка
 * @param col - столбец грида
 * @param record - текущая запись лога
 */
export const editCombobox = (col: Element, record: IUserActionType): Element | null => {
    const combobox = getChildrenOfObject(col, "combobox-content");
    if (!combobox) return null;
    if (record.quickFilter) {
        //Открыть список с выбором значений и поставить флажки
        (combobox.children[1] as HTMLElement)?.click();
        setTimeout(() => selectOptions(record), 2000);
        return combobox;
    }
    const select = combobox.children[0] as HTMLSelectElement;
    const option = Array.from(select?.options).find(el => el.innerText.includes(record?.value as string));
    if (!option) return null;
    select.selectedIndex = option.index;
    return combobox;
};
