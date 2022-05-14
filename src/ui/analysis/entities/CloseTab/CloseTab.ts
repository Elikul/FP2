import { Types } from "../../../../agent/utils/forDefineUIComponents";
import { CodeEntity } from "../CodeEntity";

//закрыть активный таб
export class CloseTab extends CodeEntity {
    isEntity(): boolean {
        return this.record.type === Types.close && this.record.tab !== undefined && this.record.nameForm !== undefined;
    }

    getCode(): string {
        return `mainPage.getWorkArea().closeActiveTab();`;
    }
}
