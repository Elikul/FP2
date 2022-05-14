import dayjs from "dayjs";

/**
 * Получить файл
 * @param url - url айла
 * @param filename - имя файла
 * @param mimeType - тип файла (расширение)
 */
export const getFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    let res = await fetch(url);
    let buf = await res.arrayBuffer();
    return new File([buf], filename, { type: mimeType });
};

/**
 * Отформатировать нужную дату
 * @param date - дата
 */
export const formatDate = (date: number) => {
    return dayjs(date).format("YYYYMMDD_HHmm");
};
