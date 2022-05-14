import dayjs from "dayjs";

export const formatDateDownload = (date: number): string => {
    return `record${dayjs(date).format("YYYYMMDD_HHmm")}.webm`;
};

export const formatDateTitle = (date: number): string => {
    return dayjs(date).format("DD/MM/YYYY  HH:mm");
};
