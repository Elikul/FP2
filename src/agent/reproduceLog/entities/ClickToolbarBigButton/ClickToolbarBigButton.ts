import { ActionEntity } from "../ActionEntity";
import { Types } from "../../../utils/forDefineUIComponents";

/**
 * Нажать на BigButton с выпадающим списком
 */
export class ClickToolbarBigButton extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.click &&
            this.record.bigButton !== undefined &&
            this.record.bigButton?.includes(" v")
        );
    }

    act(): boolean {
        const bigBtn = Array.from(document.querySelectorAll('div[class*="big-part-top"]'))?.find(
            el => el.textContent === this.record.bigButton?.replace(" v", "")
        ) as HTMLElement | null;
        if (!bigBtn) return false;

        bigBtn.click();
        return true;
    }

    getMsgErr(): string {
        return `Ошибка нажатия на вложенную BigButton - "${this.record.bigButton}"`;
    }
}
