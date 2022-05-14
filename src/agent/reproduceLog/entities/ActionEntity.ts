import { IUserActionType } from "../../../indexedDB/indexeddb";

/**
 * Сущность действия
 */
export class ActionEntity {
    protected record: IUserActionType; // текущая запись лога
    protected nextRecord?: IUserActionType; //следующая запись лога

    constructor(record: IUserActionType, nextRecord?: IUserActionType) {
        this.record = record;
        this.nextRecord = nextRecord;
    }

    /**
     * Определить какая сущность нам нужна
     */
    isEntity(): boolean {
        throw new Error("Метод не переопределен");
    }

    /**
     * Производить действие над элементом/ами
     */
    act(): boolean {
        throw new Error("Метод не переопределен");
    }

    /**
     * Получить селектор элемента, появление которого необходимо подождать после выполненного действия
     */
    getSelectorToWaitEl(): string | null {
        return null;
    }

    /**
     * Получить селектор элемента, исчезновение которого необходимо подождать для выполнения действия
     */
    getSelectorToDisappearEl(): string | null {
        return null;
    }

    /**
     * Получить сообщение ошибки
     */
    getMsgErr(): string {
        throw new Error("Метод не переопределен");
    }
}
