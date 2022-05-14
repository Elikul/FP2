import { toast } from "react-toastify";
import { IUserActionType } from "../../indexedDB/indexeddb";
import { alertOptions } from "../../Redmine/utilsRedmine";
import { entityManager } from "./entities/ActionEntityManager";
import { filterLog } from "./utils/filterLog";

/**
 * Воспроизводить лог
 * @param log - лог задачи, который нужно воспроизвести
 */
export const toReproduceLog = async (log: IUserActionType[]) => {
    const newLog = filterLog(log);
    let index = 0;
    while (index < newLog.length) {
        const record = newLog[index];
        const nextRecord = newLog[index + 1] || null;
        const isDone = await entityManager.act(record, nextRecord);
        if (!isDone) return; //прекратить дальнейшее воспроизведение лога, при возникновении ошибки выполнения
        index += 1;
    }
    toast.success("Воспроизведение лога выполнено успешно!", alertOptions);
};
