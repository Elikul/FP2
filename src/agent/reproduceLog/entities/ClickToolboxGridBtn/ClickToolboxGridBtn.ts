import { Types } from "../../../utils/forDefineUIComponents";
import { ActionEntity } from "../ActionEntity";

/**
 * Нажать на кнопку toolbar
 */
export class ClickToolboxGridBtn extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.click && this.record.gridToolbar !== undefined && this.record.grid !== undefined
        );
    }

    act(): boolean {
        const grid = document.querySelector(`div[id="${this.record.grid}"]`) as HTMLElement;
        const toolbar = grid?.children[0]?.children[0]?.children as HTMLCollection;
        if (!toolbar) return false;

        const toolbarBtn = Array.from(toolbar)?.find(
            el =>
                (el as HTMLElement)?.title === this.record.gridToolbar &&
                (el as HTMLElement)?.className.includes("grid-toolbar-button")
        );
        (toolbarBtn as HTMLElement)?.click();
        return true;
    }

    getSelectorToDisappearEl(): string | null {
        return "div[class=waiting-container]";
    }

    getSelectorToWaitEl(): string | null {
        if (this.record.gridToolbar === "Быстрый фильтр" && this.nextRecord?.quickFilter !== undefined) {
            return 'div[class*="filter on"]';
        }
        return null;
    }

    getMsgErr(): string {
        return `Ошибка нажатия на кнопку toolbar grid - "${this.record.gridToolbar}",\ngrid - "${this.record.grid}"`;
    }
}
