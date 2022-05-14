/** для вывода логов**/
import { Types } from "../../agent/utils/forDefineUIComponents";
import { IUserActionType } from "../../indexedDB/indexeddb";

let inf, value: string;

//формирование лога
export function toFormLog(records: IUserActionType[]): string[] {
    let list: string[] = [];
    for (let index = 0; index < records.length; index++) {
        inf = "";
        switch (records[index].type) {
            case Types.click:
                inf = "Клик по ";
                value = "";
                break;
            case Types.change:
                if (records[index].value !== "") {
                    inf = "Ввод с клавиатуры в ";
                    value = `  Введено: ${records[index].value}`;
                } else {
                    inf = "Отчистили ";
                    value = "";
                }
                break;
            case Types.dblclick:
                inf = "Двойной клик по ";
                value = "";
                break;
            case Types.focus:
                inf = "Фокус на ";
                value = "";
                break;
            case Types.blur:
                if (records[index].value !== undefined) {
                    inf = "Ввод с клавиатуры в ";
                    value = `  Введено:  ${records[index].value}`;
                } else if (records[index].value !== "") {
                    inf = "Отчистили ";
                    value = "";
                } else {
                    inf = "Потеря фокуса на ";
                    value = "";
                }
                break;
            case Types.checked:
                inf = "Поставили галочку в ";
                value = "";
                break;
            case Types.unchecked:
                inf = "Отменили галочку в ";
                value = "";
                break;
            default:
                value = "";
        }

        let f: boolean = false;

        if (records[index].gridCellRow !== undefined && records[index].gridCellCol !== undefined) {
            if (records[index].type === Types.dblclick) {
                inf = ` Перешли в редактирование ячейки Cell  row = ${records[index].gridCellRow} col = "${records[index].gridCellCol}"`;
            } else inf += `  ячейку Cell  row = ${records[index].gridCellRow} col = "${records[index].gridCellCol}"`;
            f = true;
        }

        if (records[index].gridToolbar !== undefined) {
            inf += `  GridToolbar title = "${records[index].gridToolbar}"`;
            f = true;
        }

        if (records[index].quickFilter !== undefined) {
            inf += `  быстрый фильтр col = "${records[index].quickFilter}"`;
            f = true;
        }

        if (records[index].grid !== undefined) {
            inf += `  Grid id = ${records[index].grid}`;
            f = true;
        }

        if (records[index].bigButton !== undefined) {
            let bigB = records[index].bigButton?.replace(" v", "");
            if (records[index].bigButton?.includes("Детализация"))
                inf = ` Нажатие на кнопку деталей BigButton title = "${bigB}"`;
            else inf += `  BigButton title = "${bigB}"`;
            f = true;
        }

        if (records[index].isFilter) {
            if (records[index].type === Types.slamming) {
                inf = `Открыт фильтр во вкладке "${records[index].tab}"`;
            } else if (records[index].type === Types.setActive)
                inf = `Открыт фильтр во вкладке "${records[index].nameForm}"`;
            f = true;
        }

        if (records[index].filterToolbar !== undefined) {
            inf += `кнопке фильтра "${records[index].filterToolbar}"`;
        }

        if (records[index].filterCaption !== undefined) {
            inf += `поле фильтра "${records[index].filterCaption}"`;
        }

        if (records[index].filterCaption !== undefined) {
            inf += `поле фильтра "${records[index].filterCaption}"`;
        }

        if (records[index].type === Types.click && records[index].modalWindowButton !== undefined) {
            inf += `кнопке "${records[index].modalWindowButton}" модального окна "${records[index].modalWindow}"`;
            f = true;
        }

        if (records[index].tab !== undefined) {
            if (
                f &&
                (records[index].gridCellRow ||
                    records[index].gridToolbar ||
                    records[index].quickFilter ||
                    records[index].grid ||
                    records[index].bigButton ||
                    records[index].filterCaption ||
                    records[index].filterToolbar !== undefined)
            )
                inf += ` Tab title = "${records[index].tab}"`;
            else inf = `  Переход на вкладку формы Tab "${records[index].tab}"`;
            f = true;
        }

        if (records[index].nameForm !== undefined && records[index].type === Types.open) {
            inf = `Открытие формы "${records[index].nameForm}"`;
            f = true;
        }

        if (records[index].nameForm !== undefined && records[index].type === Types.refresh) {
            inf = `Обновление формы "${records[index].dfdNameForm}"`;
            f = true;
        }

        if (records[index].nameForm !== undefined && records[index].type === Types.close) {
            inf = `Закрытие формы "${records[index].dfdNameForm}"`;
            f = true;
        }

        if (records[index].type === Types.minimize && records[index].tab !== undefined) {
            inf = `Уменьшение размера вкладки "${records[index].tab}"`;
            f = true;
        }

        if (records[index].type === Types.fullscreen && records[index].tab !== undefined) {
            inf = `Открытие вкладки "${records[index].tab}" на полный экран `;
            f = true;
        }

        if (records[index].type === Types.open && records[index].navigator !== undefined) {
            inf = `Открытие навигатора: ${records[index].navigator}`;
        }

        if (!f) {
            inf = "Элемент не определён";
        }

        inf += value;

        list.push(inf);
    }
    return list;
}
