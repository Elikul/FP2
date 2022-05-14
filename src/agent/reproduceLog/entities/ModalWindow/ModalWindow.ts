import { Types } from "../../../utils/forDefineUIComponents";
import { ActionEntity } from "../ActionEntity";

/**
 * Нажать на кнопки принять/закрыть модальное окно
 */
export class ModalWindow extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.click &&
            this.record.modalWindow !== undefined &&
            this.record.modalWindowButton !== undefined
        );
    }

    act(): boolean {
        const modalWindow = Array.from(document.querySelectorAll('div[class="modal_window"]'))?.find(
            el => el.children[0]?.children[0]?.textContent === this.record.modalWindow
        ) as HTMLElement;

        if (!modalWindow) return false;

        const btn = Array.from(modalWindow?.children[2]?.children)?.find(
            el => el.textContent === this.record.modalWindowButton
        ) as HTMLElement | null;

        if (!btn) return false;

        btn.click();
        return true;
    }

    getMsgErr(): string {
        return `Ошибка нажатия кнопки - "${this.record.modalWindowButton}"\nмодального окна - "${this.record.modalWindow}"`;
    }
}
