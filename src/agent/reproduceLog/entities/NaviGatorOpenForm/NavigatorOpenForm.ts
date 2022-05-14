import { Types } from "../../../utils/forDefineUIComponents";
import { ActionEntity } from "../ActionEntity";

/**
 * Открыть форму через навигатор
 */
export class NavigatorOpenForm extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.open && this.record.navigator !== undefined && this.record.nameForm !== undefined
        );
    }

    act(): boolean {
        const menuItem = this.record.navigator?.split('","');
        menuItem?.forEach(itemName => {
            const menuBtn = document.querySelector(`a[title ="${itemName.replace('"', "")}"]`) as HTMLElement | null;
            if (!menuBtn) return false;
            menuBtn.click();
        });
        return true;
    }

    getSelectorToWaitEl(): string {
        return `a[data-caption="${this.record.nameForm}"][class="tab-header tab-active"]`;
    }

    getMsgErr(): string {
        return `Ошибка открытия формы "${this.record.nameForm}" через навигатор\n(${this.record.navigator})`;
    }
}
