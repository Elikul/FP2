import { IUserActionType } from "../../indexedDB/indexeddb";
import { Types } from "../../agent/utils/forDefineUIComponents";

/**
 * Отфильтровать лог сессии
 * @param log - лог сессии
 */
export const filterSessionLog = (log: IUserActionType[]): IUserActionType[] => {
    return log.filter(
        (record, index, array) =>
            !(
                record.type === Types.setActive &&
                array[index + 1]?.type === Types.open &&
                record.nameForm === array[index + 1]?.nameForm
            )
    );
};
