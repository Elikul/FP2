/**
 * Определяем по каким компонентам было совершено действие
 */
import {
    defineParentsObject,
    getChildrenOfObject,
    getGridCellColumnName,
    getNode,
    getQuickFilterColumnName,
    Types
} from "./forDefineUIComponents";
import Agent from "../Agent";

// data-control-type
export enum ControlTypes {
    grid = "Grid",
    tab = "TabContainer",
    container = "Container"
}

// class
export enum ClassTypes {
    bigButton = "big-small-button",
    bigButtonCombo = "big-small-combo",
    bigButtonScroll = "big-float",
    gridToolbar = "grid-toolbar-button",
    cell = "cell",
    quickFilter = "filter",
    quickFilterCol = "[object Object]",
    consolidationFilterToolbar = "propertyfilter-toolbar",
    consolidationFilterCaption = "propertyfilter-table",
    filterToolbar = "button__toolbar",
    filterCaption = "propertyTableRow",
    placeHolderDate = "datepicker-placeHolder",
    check = "checked",
    uncheck = "unchecked",
    modalWindowOk = "mw_ok",
    modalWindowClose = "mw_close",
    modalWindow = "modal_window",
    even = "even",
    odd = "odd",
    multiSelect = "multiselect-placeHolder",
    inputCombobox = "combobox-input",
    grid = "grid-control"
}

export enum Components {
    formName = "formName",
    formDFDName = "formDFDName",
    navigator = "navigator",
    tab = "tab",
    filter = "filter",
    gridToolbar = "gridToolbar",
    gridCell = "gridCell",
    gridColName = "gridColName",
    quickFilter = "quickFilter",
    quickFilterCol = "quickFilterCol",
    grid = "grid",
    bigButton = "bigButton",
    modalWindow = "modalWindow",
    modalWindowButton = "modalWindowButton",
    filterToolbar = "filterToolbar",
    filterCaption = "filterCaption"
}

export const DATA_TYPE: string = "data-control-type";
export const CLASS_TYPE: string = "class";

/**
 * Совершено ли действие с TabContainer
 * @param ev - событие
 */
export const findTabContainer = (ev: Event): string | null => {
    const container: HTMLElement | null = defineParentsObject(ev, getNode(DATA_TYPE, ControlTypes.tab));

    if (container !== null) {
        return container?.getAttribute("id");
    }
    return null;
};

/**
 * Совершено ли действие с грид
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 */
const findGrid = (ev: Event, map: Map<string, HTMLElement>): HTMLElement | null => {
    const grid: HTMLElement | null =
        defineParentsObject(ev, getNode(DATA_TYPE, ControlTypes.grid)) ||
        document.querySelector(`div[data-control-type="${ControlTypes.grid}"]`);
    if (grid === null) return null;
    map.set(Components.grid, grid);
    return grid;
};

/**
 * Искать ближайший грид к компоненту (нажатие bigButton может изменять grid)
 * @param map - коллекция элементов для последующей с ними работой
 * @param tab - имя активного tab
 */
const findClosestGrid = (map: Map<string, HTMLElement>, tab: string | undefined) => {
    if (!tab) return;

    const tabContainer = document.querySelector(`div[data-control-type="${ControlTypes.container}"][title="${tab}"]`);

    const grid = tabContainer
        ? getChildrenOfObject(tabContainer, ClassTypes.grid)
        : document.querySelector(`div[data-control-type="${ControlTypes.grid}"]`);

    if (grid !== null) map.set(Components.grid, grid as HTMLElement);
};

/**
 * Совершено ли действие с BigButton
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 * @param tab - имя активного tab
 */
export const findBigButton = (ev: Event, map: Map<string, HTMLElement>, tab: string | undefined) => {
    const bigButton: HTMLElement | null =
        defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.bigButton)) ||
        defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.bigButtonCombo));

    if (bigButton !== null) {
        map.set(Components.bigButton, bigButton);

        //Получить ближайший grid (нажатие bigButton может изменять grid)
        findClosestGrid(map, tab);
    }
};

/**
 * Совершено ли действие с панелью грид
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 */
export const findGridToolbar = (ev: Event, map: Map<string, HTMLElement>) => {
    const gridToolbar: HTMLElement | null = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.gridToolbar));

    if (gridToolbar !== null) {
        map.set(Components.gridToolbar, gridToolbar);
        findGrid(ev, map);
    }
};

/**
 * Совершено ли действие с ячейкой выбора
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 * @param type - тип события
 */
export const findCheckBox = (ev: Event, map: Map<string, HTMLElement>, type: Types) => {
    const checkBox: HTMLElement | null = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.check));

    if (checkBox !== null && type === Types.blur) {
        findGrid(ev, map);
        let classCheckBox = checkBox.getAttribute(CLASS_TYPE);
        if (classCheckBox?.includes("un")) {
            type = Types.unchecked;
        } else type = Types.checked;
    }
    return type;
};

/**
 * Совершено ли действие с ячейкой грид
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 * @param type - тип события
 */
export const findGridCell = (ev: Event, map: Map<string, HTMLElement>, type: Types) => {
    let gridCell: HTMLElement | null = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.cell));

    if (gridCell !== null) {
        if (type === Types.click || type === Types.dblclick) return;
        map.set(Components.gridCell, gridCell);
        const gridContainer = findGrid(ev, map);
        getGridCellColumnName(map, gridCell, gridContainer);
    }
};

/**
 * Совершено ли действие с быстрым фильтром
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 * @param type - тип события
 */
export const findQuickFilter = (ev: Event, map: Map<string, HTMLElement>, type: Types) => {
    const quickFilter: HTMLElement | null = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.quickFilter));

    const quickFilterCol: HTMLElement | null = defineParentsObject(ev, node => node?.getAttribute?.("col"));

    if (quickFilter === null || type === Types.click || type === Types.dblclick) return;

    map.set(Components.quickFilter, quickFilter);
    const gridContainer = findGrid(ev, map);
    if (quickFilterCol !== null && gridContainer !== null) {
        getQuickFilterColumnName(map, quickFilterCol, gridContainer);
    }
};

/**
 * Совершено ли действие с модальным окном
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 * @param type - тип события
 */
export const findModalWindow = (ev: Event, map: Map<string, HTMLElement>, type: Types) => {
    const modalWindowButton: HTMLElement | null =
        defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.modalWindowOk)) ||
        defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.modalWindowClose));

    if (modalWindowButton !== null && type === Types.click) {
        let modalWindow: HTMLElement | null = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.modalWindow));
        if (modalWindow !== null) {
            let modalWindowCaption: Element | null = getChildrenOfObject(modalWindow, "core-modal-header-title");
            map.set(Components.modalWindow, <HTMLElement>modalWindowCaption);
            map.set(Components.modalWindowButton, modalWindowButton);
        }
    }
};

/**
 * Совершено ли действие с фильтром
 * @param ev - событие
 * @param map - коллекция элементов для последующей с ними работой
 * @param type - тип события
 * @param isConsolidation - если приложение является "Консолидация"
 */
export const findFilter = (ev: Event, map: Map<string, HTMLElement>, type: Types, isConsolidation: boolean) => {
    let filterToolbar: HTMLElement | null;
    let filterCaption: HTMLElement | null;

    if (isConsolidation) {
        filterToolbar = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.consolidationFilterToolbar));
        filterCaption = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.consolidationFilterCaption));
    } else {
        filterToolbar = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.filterToolbar));
        filterCaption = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.filterCaption));
    }

    if (filterToolbar !== null) {
        if (isConsolidation) {
            map.set(Components.filterToolbar, <HTMLElement>ev.target);
        } else map.set(Components.filterToolbar, filterToolbar);
    }

    if (filterCaption !== null && (type === Types.change || type === Types.checked || type === Types.unchecked)) {
        if (isConsolidation) {
            let name =
                defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.even)) ||
                defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.odd));
            map.set(Components.filterCaption, <HTMLElement>name);
        } else {
            let name = getChildrenOfObject(filterCaption, "panel-caption");
            map.set(Components.filterCaption, <HTMLElement>name);
        }
    }
};

/**
 * Совершено ли действие с полем выбора
 * @param ev - событие
 */
export const findCombobox = (ev: Event | any) => {
    const placeHolderMultiselect = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.multiSelect));
    if (placeHolderMultiselect === null) return;
    let inputCombobox = getChildrenOfObject(placeHolderMultiselect, ClassTypes.inputCombobox) as HTMLInputElement;
    if (inputCombobox === null) return;
    inputCombobox.onchange = () => {
        setTimeout(() => Agent.callbackEvent(Types.change, ev), 2000);
    };
};

/**
 * Cовершено ли действие с полем выбора даты
 * @param ev - событие
 */
export const findDatePicker = (ev: Event) => {
    const placeHolderDatePicker = defineParentsObject(ev, getNode(CLASS_TYPE, ClassTypes.placeHolderDate));
    if (placeHolderDatePicker === null) return;
    placeHolderDatePicker.onchange = () => {
        setTimeout(() => Agent.callbackEvent(Types.change, ev), 2000);
    };
};
