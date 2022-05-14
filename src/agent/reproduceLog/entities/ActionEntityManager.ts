import { IUserActionType } from "../../../indexedDB/indexeddb";
import { ActionEntity } from "./ActionEntity";
import { ClickBigButton } from "./ClickBigButton";
import { ClickToolbarBigButton } from "./ClickToolbarBigButton";
import { ClickToolboxGridBtn } from "./ClickToolboxGridBtn";
import { ModalWindow } from "./ModalWindow";
import { NavigatorOpenForm } from "./NaviGatorOpenForm";
import { OpenFormInStartPage } from "./OpenFormInStartPage";
import { SetActiveTab } from "./SetActiveTab";
import { waitElement, waitElementToDisappear } from "../utils/waitElement";
import { alertOptions } from "../../../Redmine/utilsRedmine";
import { toast } from "react-toastify";
import { SetValueInQuickFilter } from "./SetValueInQuickFilter";
import { SetValueInGridCell } from "./SetValueInGridCell";
import { SetFilterParameter } from "./SetFilterParameter";
import { ApplyFilter } from "./ApplyFilter";
import { ResetFilter } from "./ResetFilter";

/**
 * Производить действие над конкретной сущностью
 */
export class ActionEntityManager {
    //список сущностей
    static entities = [
        NavigatorOpenForm,
        SetActiveTab,
        OpenFormInStartPage,
        ClickBigButton,
        ClickToolbarBigButton,
        ModalWindow,
        ClickToolboxGridBtn,
        SetValueInQuickFilter,
        SetValueInGridCell,
        SetFilterParameter,
        ApplyFilter,
        ResetFilter
    ];

    /**
     * Найти нужную сущность
     * @param record - текущая запись лога
     * @param nextRecord - следующая запись лога
     */
    findEntity(record: IUserActionType, nextRecord?: IUserActionType): ActionEntity | undefined {
        for (let EntityClass of ActionEntityManager.entities) {
            const entity = new EntityClass(record, nextRecord);

            if (entity.isEntity()) {
                return entity;
            }
        }
    }

    /**
     * Появились ли изменения на странице, после выполненного действия
     * @param entity - сущность (record: IUserActionType, nextRecord: IUserActionType)
     */
    async isActDone(entity: ActionEntity): Promise<boolean> {
        const selector = entity?.getSelectorToWaitEl();
        if (!selector) return true;
        return waitElement(selector);
    }

    /**
     * Выполнить действие и проверить его выполнение
     * @param entity - сущность (record: IUserActionType, nextRecord: IUserActionType)
     */
    async checkActionDone(entity: ActionEntity): Promise<boolean> {
        await new Promise(r => setTimeout(r, 2000)); //подождать окончания всех предыдущих изменений
        return entity?.act() && (await this.isActDone(entity));
    }

    /**
     * Подождать, если необходимо, чтобы какой-то элемент пропал на странице перед выполнением действия
     * @param entity - сущность (record: IUserActionType, nextRecord: IUserActionType)
     */
    async waitMakeAction(entity: ActionEntity): Promise<boolean> {
        const selector = entity?.getSelectorToDisappearEl();
        if (selector) {
            const isHidden = await waitElementToDisappear(selector);
            if (!isHidden) return false;
            return this.checkActionDone(entity);
        }
        return this.checkActionDone(entity);
    }

    /**
     * Если сущность найдена, произвести действие
     * @param record - текущая запись лога
     * @param nextRecord - следующая запись лога
     */
    async act(record: IUserActionType, nextRecord?: IUserActionType): Promise<boolean> {
        const entity = this.findEntity(record, nextRecord);
        if (!entity) {
            toast.error(`Воспроизведение лога не выполнено!\nСущность не найдена.`, alertOptions);
            return false;
        }

        const isDone = await this.waitMakeAction(entity);
        if (!isDone) {
            toast.error(`Воспроизведение лога не выполнено!\n${entity.getMsgErr()}`, alertOptions);
            return false;
        }

        return true;
    }
}

export const entityManager = new ActionEntityManager();
