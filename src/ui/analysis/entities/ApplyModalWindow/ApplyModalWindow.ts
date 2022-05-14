import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//Нажать кнопку "Применить" в модальном окне
export class ApplyModalWindow extends CodeEntity {
    isEntity(): boolean {
        return !!(
            this.record.type === Types.click &&
            this.record.modalWindow !== undefined &&
            this.record.modalWindowButton !== undefined &&
            this.record.modalWindowButton?.includes("Применить")
        );
    }

    getCode(): string {
        return `mainPage.getModalWindow("${this.record.modalWindow}").waitForLoadingWindow().ok();`;
    }
}
