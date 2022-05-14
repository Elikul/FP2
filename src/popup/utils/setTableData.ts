/**
 * Заполнить табличку с версиями проектов, используемых в приложении
 * @param tbody - таблица
 * @param cols - столбцы, которые нужно вставить в таблицу
 */
const setTableInfo = (tbody: HTMLElement, cols: string[]) => {
    if (tbody) {
        const row = document.createElement("tr");
        cols.forEach(item => {
            const col = document.createElement("td");
            col.innerText = item.replace(/[\:\[\]\"]/g, " ");
            row.appendChild(col);
        });
        tbody.appendChild(row);
    }
};

/**
 * Разобрать полученный ответ от страницы ресурсов
 * @param response - ответ от страницы ресурсов
 */
export const parseVersionResponse = (response: string) => {
    const tbody: HTMLElement | null = document.querySelector(".table-body");
    if (tbody?.children.length !== 0) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(response, "text/html");

    const headings = doc.querySelectorAll("h3");
    Array.from(headings).forEach((item: HTMLHeadingElement) => {
        let revision: string = item.innerText.substr(item.innerText.indexOf("["));
        let row: string[] = item.innerText.split(" ", 2);
        row.push(revision);
        setTableInfo(tbody, row);
    });
};
