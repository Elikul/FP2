import { ActionEntity } from "../ActionEntity";
import { Types } from "../../../utils/forDefineUIComponents";

/**
 * Применить фильтр
 */
export class ApplyFilter extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.filterToolbar !== undefined &&
            (this.record.type === Types.click || this.record.type === Types.blur) &&
            this.record.filterToolbar?.includes("Применить")
        );
    }

    act(): boolean {
        const applyBtn = document.querySelector(`div[class*="apply__button"]`) as HTMLElement | null;
        if (applyBtn === null) return false;
        applyBtn.click();
        return true;
    }

    getMsgErr(): string {
        return `Ошибка "применить" фильтр"`;
    }
}
