/**Фильтрация сгенерированного кода**/

//убрать пустые строки
const removeEmptyStrings = (strings: string[]): string[] => {
    return strings.filter(Boolean);
};

const formatterCode = (strings: string[]): string[] => {
    let list: string[] = [];
    strings.forEach((value, index, array) => {
        //убрать метод clickButton, если после произошёл метод clickToolbarButton
        if (value.includes("clickButton") && array[index + 1]?.includes("clickToolbarButton")) {
        } else if (value.includes("getModalWindow") && array[index + 1]?.includes("setColumnValueInSelectedRow")) {
        } else list.push(value);
    });
    return list;
};

//фильтрация сгенерированного кода (убрать лишние повторения методов и т.п.)
export function filterGeneratedCode(strings: string[]) {
    const formatter = [removeEmptyStrings, formatterCode];

    return formatter.reduce((acc, formatter) => formatter(acc), strings);
}
