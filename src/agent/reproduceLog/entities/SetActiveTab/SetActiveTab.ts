import { Types } from "../../../utils/forDefineUIComponents";
import { ActionEntity } from "../ActionEntity";

/**
 * Активировать tab
 */
export class SetActiveTab extends ActionEntity {
    isEntity(): boolean {
        return this.record.type === Types.setActive && this.record.tab !== undefined;
    }

    act(): boolean {
        const tab = document.querySelector(`a[title="${this.record.tab}"]`) as HTMLElement | null;
        if (!tab) return false;
        tab.click();
        return true;
    }

    getSelectorToWaitEl(): string {
        return `a[data-caption="${this.record?.tab}"][class="tab-header tab-active"]`;
    }

    getMsgErr(): string {
        return `Ошибка активации таба - "${this.record.tab}"`;
    }
}
