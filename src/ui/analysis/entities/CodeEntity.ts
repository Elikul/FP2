import { IUserActionType } from "../../../indexedDB/indexeddb";
import { translate } from "../utils/Translate";

export class CodeEntity {
    protected record: IUserActionType; //текущая запись
    protected prevRecord?: IUserActionType; //предыдущая запись
    protected nextRecord?: IUserActionType; //следующая запись
    protected form_name?: string;
    protected panel_name?: string;

    constructor(record: IUserActionType, prevRecord?: IUserActionType, nextRecord?: IUserActionType) {
        this.record = record;
        this.prevRecord = prevRecord;
        this.nextRecord = nextRecord;
        this.form_name = translate(this.record.nameForm);
        this.panel_name = translate(this.record.tab);
    }

    //проверка какая сущность нам нужна
    isEntity(): boolean {
        throw new Error("Метод не переопределен");
    }

    //получить дополнительный код "до" для сущности
    getPrevCode(): string {
        return "";
    }

    //получить дополнительный код "после" для сущности
    getPostCode(): string {
        return "";
    }

    //получить код для нужной сущности
    getCode(): string {
        throw new Error("Метод не переопределен");
    }
}
