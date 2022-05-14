import { defineParentsObject, getXPath, Types } from "./forDefineUIComponents";
import { CLASS_TYPE, ClassTypes, Components } from "./findComponents";
import { IUserActionType } from "../../indexedDB/indexeddb";

/**
 * Получить элемент из коллекции по его имени
 * @param map - коллекция элементов
 * @param componentName - имя элемента в коллекции
 */
const getElementFromMap = (
    map: Map<string, string | undefined | boolean | HTMLElement>,
    componentName: Components
): string | undefined | boolean | HTMLElement => {
    if (map.has(componentName)) {
        return map.get(componentName);
    }
    return undefined;
};

/**
 * Формирует объект данных от логгера CoreAnalytics для сохранения в indexedDB
 * @param map - коллекция элементов
 * @param type - тип события
 * @param formName - заголовок формы
 * @param tabActive - заголовок активного таба
 * @param tabContainer - id TabContainer
 */
export const formLogFromCoreAnalytics = (
    map: Map<string, string | undefined | boolean | HTMLElement>,
    type: Types,
    formName: string,
    tabActive: string | undefined,
    tabContainer: string | null
) => {
    if (map.size === 0) return null;

    let formN, tab, formD, isFilter, navigator: string | boolean | undefined | HTMLElement;

    formN = getElementFromMap(map, Components.formName);
    if (formN === undefined) {
        formN = formName;
    }

    formD = getElementFromMap(map, Components.formDFDName);
    navigator = getElementFromMap(map, Components.navigator);

    tab = getElementFromMap(map, Components.tab);
    if (tab === undefined) {
        tab = tabActive;
    }

    isFilter = getElementFromMap(map, Components.filter);
    if (isFilter === undefined) {
        isFilter = false;
    }

    return {
        date: Date.now(),
        type: type,
        nameForm: formN,
        dfdNameForm: formD,
        tab: tab,
        tabContainer: tabContainer,
        isFilter: isFilter,
        navigator: navigator
    };
};

/**
 * Формирует объект данных для сохранения в indexedDB
 * @param map - коллекция элементов
 * @param type - тип события
 * @param ev - событие
 * @param formName - заголовок формы
 * @param tabActive - заголовок активного таба
 * @param tabContainer - id TabContainer
 * @param isConsolidation - если проект "Консолидация"
 */
export const formLog = (
    map: Map<string, HTMLElement>,
    type: Types,
    ev: any,
    formName: string,
    tabActive: string | undefined,
    tabContainer: string | null,
    isConsolidation: boolean
): IUserActionType | null => {
    if (map.size === 0) {
        return null;
    }

    let tab,
        bigButton,
        grid,
        gridToolbar,
        gridCellRow,
        gridCellCol,
        quickFilter,
        filterToolbar,
        filterCaption,
        modalWindowCaption,
        modalWindowButton,
        value: string | undefined;
    let isFilter: boolean = false;

    gridCellRow = (getElementFromMap(map, Components.gridCell) as HTMLElement)?.getAttribute("row");
    gridCellCol = getElementFromMap(map, Components.gridColName);
    quickFilter = getElementFromMap(map, Components.quickFilterCol);
    modalWindowCaption = (getElementFromMap(map, Components.modalWindow) as HTMLElement)?.innerText;
    modalWindowButton = (getElementFromMap(map, Components.modalWindowButton) as HTMLElement)?.innerText;
    gridToolbar = (getElementFromMap(map, Components.gridToolbar) as HTMLElement)?.getAttribute("title");
    grid = (getElementFromMap(map, Components.grid) as HTMLElement)?.getAttribute("id");

    if (defineParentsObject(ev, node => node?.getAttribute?.(CLASS_TYPE)?.includes(ClassTypes.bigButtonScroll))) {
        bigButton = (getElementFromMap(map, Components.bigButton) as HTMLElement)?.innerText + " v";
    } else {
        bigButton = (getElementFromMap(map, Components.bigButton) as HTMLElement)?.getAttribute("title");
    }

    let filterTool = getElementFromMap(map, Components.filterToolbar) as HTMLElement;
    if (isConsolidation) {
        if (filterTool?.innerHTML.includes("Применить")) filterToolbar = "Применить";
        else if (filterTool?.innerHTML.includes("Очистить")) filterToolbar = "Очистить";
    } else filterToolbar = filterTool?.getAttribute("title");
    if (filterTool !== undefined) {
        isFilter = true;
    }

    let fltCaption = getElementFromMap(map, Components.filterCaption) as HTMLElement;
    if (isConsolidation) {
        filterCaption = fltCaption?.getAttribute("displayname");
    } else filterCaption = fltCaption?.innerText;
    if (fltCaption !== undefined) {
        isFilter = true;
    }

    if (
        map.has(Components.grid) ||
        map.has(Components.bigButton) ||
        map.has(Components.filterToolbar) ||
        map.has(Components.filterCaption)
    ) {
        tab = tabActive;
    }

    switch (type) {
        case Types.change:
        case Types.blur:
            const className = ev.target?.className;
            const targetValue = ev.target?.value;
            if (className?.includes("combobox")) {
                if (targetValue === "") return null;
                value = ev.target?.selectedOptions[0]?.innerText;
            } else if (className?.includes("ui-multiselect")) {
                value = ev.target?.children[1]?.title + " m";
            } else {
                value = targetValue;
            }
            if (value === "...") value = undefined;
            break;
        case Types.checked:
            value = "1";
            break;
        case Types.unchecked:
            value = "0";
            break;
        default:
            value = undefined;
    }

    return {
        date: Date.now(),
        type: type,
        tab: tab,
        tabContainer: tabContainer,
        nameForm: formName,
        bigButton: bigButton,
        grid: grid,
        gridToolbar: gridToolbar,
        gridCellRow: gridCellRow,
        gridCellCol: gridCellCol,
        quickFilter: quickFilter,
        isFilter: isFilter,
        filterToolbar: filterToolbar,
        filterCaption: filterCaption,
        modalWindow: modalWindowCaption,
        modalWindowButton: modalWindowButton,
        value: value,
        xpath: getXPath(ev.target)
    };
};
