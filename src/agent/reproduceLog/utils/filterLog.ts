import { IUserActionType } from "../../../indexedDB/indexeddb";

//убрать лог нажатия кнопки на панели грида - "Редактировать запись" (при редактировании ячейки уже выполняется это действие)
const removeBtnEdit = (log: IUserActionType[]): IUserActionType[] => {
    return log.filter(record => record?.gridToolbar !== "Редактировать запись");
};

//убрать лог работы с модальным окном при редактировании ячеек
const removeModalWindow = (log: IUserActionType[]): IUserActionType[] => {
    return log.filter(
        (record, index, arr) =>
            !(
                record?.modalWindow !== undefined &&
                arr[index - 1]?.gridCellRow !== undefined &&
                arr[index + 1]?.gridCellRow !== undefined
            )
    );
};

/**
 * Отфильтровать лог перед воспроизведением лога
 * @param log - лог, прикреплённый к задаче
 */
export const filterLog = (log: IUserActionType[]) => {
    const formatter = [removeBtnEdit, removeModalWindow];

    return formatter.reduce((acc, formatter) => formatter(acc), log);
};
