import { IUserActionType } from "../../indexedDB/indexeddb";
import { Components } from "./findComponents";

//тип событий
export enum Types {
    click = "click",
    dblclick = "dblclick",
    change = "change",
    focus = "focus",
    blur = "blur",
    setActive = "set active",
    open = "open",
    refresh = "refresh",
    close = "close",
    fullscreen = "fullscreen",
    minimize = "minimize",
    unknown = "unknown",
    slamming = "slamming",
    move = "move",
    keydown = "keydown",
    checked = "checked",
    unchecked = "unchecked"
}

/**
 * Получить элемент по заданному атрибуту и его значению
 * @param attribute - атрибут элемента
 * @param value - значение атрибута
 */
export const getNode = (attribute: string, value: string) => node => node?.getAttribute?.(attribute)?.includes(value);

/**
 * найти родительские элементы для определения ui-компонентов
 * @param ev
 * @param func
 */
export const defineParentsObject = (ev: Event, func: (node: HTMLElement) => any): HTMLElement | null => {
    let node: HTMLElement | null = ev.target as HTMLElement;
    while (node) {
        if (func(node)) {
            return node;
        }

        node = node?.parentElement;
    }

    return null;
};

/**
 * Найти дочерние элементы для определения ui-компонентов
 * @param element - текущий элемент
 * @param childClass - класс дочернего элементы
 */
export const getChildrenOfObject = (element: Element, childClass: string): Element | null => {
    const childElements: HTMLCollection = element.children;

    if (childElements.length > 0) {
        for (let i = 0; i < childElements.length; i++) {
            if (childElements[i]?.classList.contains(childClass)) {
                return childElements[i];
            }

            if (childElements[i].children?.length) {
                const result = getChildrenOfObject(childElements[i], childClass);

                if (result) {
                    return result;
                }
            }
        }
    }

    return null;
};

/**
 * Получить xpath элемента
 * @param node - элемент
 */
export const getXPath = (node: any): string => {
    let comp: any,
        comps: any = [];
    let xpath = "";
    let getPos = function(node: any) {
        let position = 1,
            curNode;
        if (node.nodeType == Node.ATTRIBUTE_NODE) {
            return null;
        }
        for (curNode = node.previousSibling; curNode; curNode = curNode.previousSibling) {
            if (curNode.nodeName == node.nodeName) {
                ++position;
            }
        }
        return position;
    };

    if (node instanceof Document) {
        return "/";
    }

    for (
        ;
        node && !(node instanceof Document);
        node = node.nodeType == Node.ATTRIBUTE_NODE ? node.ownerElement : node.parentNode
    ) {
        comp = comps[comps.length] = {};
        switch (node.nodeType) {
            case Node.TEXT_NODE:
                comp.name = "text()";
                break;
            case Node.ATTRIBUTE_NODE:
                comp.name = "@" + node.nodeName;
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                comp.name = "processing-instruction()";
                break;
            case Node.COMMENT_NODE:
                comp.name = "comment()";
                break;
            case Node.ELEMENT_NODE:
                comp.name = node.nodeName;
                break;
        }
        comp.position = getPos(node);
    }

    for (let i = comps.length - 1; i >= 0; i--) {
        comp = comps[i];
        xpath += "/" + comp.name;
        if (comp.position != null) {
            xpath += "[" + comp.position + "]";
        }
    }

    return xpath;
};

let numberCalls: number = 0;
let xpath: string | undefined;

/**
 * Проверить, что произошло событие focus-change-blur
 * @param log - лог произошедшего события
 */
export const checkEventChange = (log: IUserActionType): boolean => {
    let f: boolean = false;
    switch (log.type) {
        case Types.focus:
            numberCalls++;
            break;
        case Types.change:
            if (log.xpath === xpath) {
                numberCalls++;
            }
            break;
        case Types.blur:
            if (log.xpath === xpath) {
                numberCalls--;
            }
            if (numberCalls === 1) {
                f = true;
                numberCalls = 0;
            }
            break;
    }
    xpath = log.xpath;
    return f;
};

/**
 * Получить имя колонки
 * @param gridContainer - Grid
 * @param field - ячейка грид
 * @param col - столбец грид
 * @param colName - имя столбца грид
 */
export const getColName = (gridContainer: any, field: any, col: string, colName: string | null): string | null => {
    if (field?.hint !== undefined && field?.hint !== null) {
        colName = field.hint + `", "` + colName;
    } else if (field?.displayname !== undefined && field?.displayname !== null) {
        colName = field.displayname + `", "` + colName;
    } else colName = field?.name + `", "` + colName;

    if (field?.parent !== undefined && field?.parent !== null) {
        col = field.parent;
        field = gridContainer?.grid?.fields[col];
        colName = getColName(gridContainer, field, col, colName);
    } else return colName;

    if (colName) return colName;

    return null;
};

/**
 * Получить имя колонки ячейки грид, с которой работали
 * @param map - коллекция элементов для последующей с ними работой
 * @param gridCell - ячейка грид
 * @param gridContainer - Grid
 */
export const getGridCellColumnName = (map: Map<string, HTMLElement>, gridCell: HTMLElement, gridContainer: any) => {
    let gridColName: string | null = "";
    if (gridContainer !== null) {
        let col: string | null | undefined = map.get(Components.gridCell)?.getAttribute("col");

        if (col !== null && col !== undefined) {
            let field = gridContainer.grid?.fields[col];
            gridColName = getColName(gridContainer, field, col, gridColName);
            if (gridColName !== null) {
                if (gridColName.includes("<")) {
                    gridColName.replace(/([^а-яА-Я]*)/, "").replace(/([^а-яА-Я]*)$/, "");
                }
                map.set(Components.gridColName, <any>gridColName.replace(/", "([^", "]*)$/, ""));
            }
        }
    }
};

/**
 * Получить имя колонки быстрого фильтра
 * @param map - коллекция элементов для последующей с ними работой
 * @param QFCellColl - ячейка быстрого фильтра
 * @param gridContainer - Grid
 */
export const getQuickFilterColumnName = (
    map: Map<string, HTMLElement>,
    QFCellColl: HTMLElement,
    gridContainer: any
) => {
    let QFColName: string | null = "";
    let col: string | null | undefined = QFCellColl.getAttribute("col");

    if (col === null || col === undefined) return;
    let field = gridContainer.grid?.fields[col];
    QFColName = getColName(gridContainer, field, col, QFColName);

    if (QFColName === null) return;
    if (QFColName.includes("<")) {
        QFColName.replace(/([^а-яА-Я]*)/, "").replace(/([^а-яА-Я]*)$/, "");
    }
    map.set(Components.quickFilterCol, <any>QFColName.replace(/", "([^", "]*)$/, ""));
};
