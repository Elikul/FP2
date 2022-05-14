import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//Нажать кнопку "Закрыть" в модальном окне
export class CloseModalWindow extends CodeEntity {
    isEntity(): boolean {
        return !!(
            this.record.type === Types.click &&
            this.record.modalWindow !== undefined &&
            this.record.modalWindowButton !== undefined &&
            this.record.modalWindowButton?.includes("Закрыть")
        );
    }

    getCode(): string {
        return `mainPage.getModalWindow("${this.record.modalWindow}").waitForLoadingWindow().close();`;
    }
}
