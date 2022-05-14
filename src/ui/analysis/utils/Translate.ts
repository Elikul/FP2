export function translate(word: string | undefined): string | undefined {
    if (word === undefined) return "";

    let converter: Map<string, string> = new Map([
        ["а", "a"],
        ["б", "b"],
        ["в", "v"],
        ["г", "g"],
        ["д", "d"],
        ["е", "e"],
        ["ё", "e"],
        ["ж", "zh"],
        ["з", "z"],
        ["и", "i"],
        ["й", "y"],
        ["к", "k"],
        ["л", "l"],
        ["м", "m"],
        ["н", "n"],
        ["о", "o"],
        ["п", "p"],
        ["р", "r"],
        ["с", "s"],
        ["т", "t"],
        ["у", "u"],
        ["ф", "f"],
        ["х", "h"],
        ["ц", "c"],
        ["ч", "ch"],
        ["ш", "sh"],
        ["щ", "sch"],
        ["ь", ""],
        ["ы", "y"],
        ["ъ", ""],
        ["э", "e"],
        ["ю", "yu"],
        ["я", "ya"]
    ]);

    word = word.toLowerCase();

    let answer = "";
    for (let i = 0; i < word.length; ++i) {
        if (converter.has(word[i])) {
            answer += converter.get(word[i]);
        } else {
            answer += word[i];
        }
    }

    answer = answer.replace(/[^-0-9a-z]/g, "_");
    answer = answer.replace(/[-]+/g, "_");
    answer = answer.replace(/^\-|-$/g, "");

    let str: string[] = answer.split("_");
    for (let i = 0; i < str.length; ++i) {
        str[i] = str[i].slice(0, 4);
    }

    return str.join("_");
}
