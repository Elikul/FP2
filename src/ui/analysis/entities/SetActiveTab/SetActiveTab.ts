import { Types } from "../../../../agent/utils/forDefineUIComponents";
import { CodeEntity } from "../CodeEntity";

//сделать таб активным
export class SetActiveTab extends CodeEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.setActive &&
            this.record.tab !== undefined &&
            this.record.nameForm !== undefined &&
            this.prevRecord?.tab !== this.record.tab &&
            this.prevRecord?.type !== Types.open
        );
    }

    getCode(): string {
        return `FormUtils.activateTab(mainPage,"${this.record.tab}");`;
    }
}
