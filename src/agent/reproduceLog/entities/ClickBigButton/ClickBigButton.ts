import { Types } from "../../../utils/forDefineUIComponents";
import { ActionEntity } from "../ActionEntity";

/**
 * Нажать на BigButton
 */
export class ClickBigButton extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.click &&
            this.record.bigButton !== undefined &&
            !this.record.bigButton?.includes(" v")
        );
    }

    act(): boolean {
        const bigBtn = document.querySelector(`div[title="${this.record.bigButton}"]`);
        if (!bigBtn) return false;

        if (this.nextRecord?.bigButton?.includes(" v") && this.nextRecord.type === Types.click) {
            (bigBtn.children[1] as HTMLElement)?.click();
            return true;
        }
        (bigBtn.children[0] as HTMLElement)?.click();
        return true;
    }

    getSelectorToWaitEl(): string | null {
        if (this.nextRecord?.bigButton !== undefined && this.nextRecord.type === Types.click) {
            return `div[class*="big-small"][class*="dd"]`;
        }
        return null;
    }

    getSelectorToDisappearEl(): string | null {
        return "div[class=waiting-container]";
    }

    getMsgErr(): string {
        return `Ошибка нажатия на BigButton - "${this.record.bigButton}"`;
    }
}
