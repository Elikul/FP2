import { Types } from "../../../utils/forDefineUIComponents";
import { ActionEntity } from "../ActionEntity";

/**
 * Открыть форму, нажав по ссылке на стартовой странице
 */
export class OpenFormInStartPage extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.open &&
            this.record.nameForm !== undefined &&
            this.record.dfdNameForm !== undefined &&
            this.record.navigator === undefined
        );
    }

    act(): boolean {
        const link = Array.from(document.querySelectorAll(`a`)).find(
            element => element.textContent === this.record.nameForm
        ) as HTMLElement | null;

        if (!link) return false;
        link.click();
        return true;
    }

    getSelectorToWaitEl(): string {
        return `a[data-caption="${this.record?.nameForm}"][class="tab-header tab-active"]`;
    }

    getMsgErr(): string {
        return `Ошибка открытия формы "${this.record.nameForm}" со стартовой страницы`;
    }
}
