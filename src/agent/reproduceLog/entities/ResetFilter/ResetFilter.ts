import { ActionEntity } from "../ActionEntity";
import { Types } from "../../../utils/forDefineUIComponents";

export class ResetFilter extends ActionEntity {
    isEntity(): boolean {
        return (
            this.record.filterToolbar !== undefined &&
            (this.record.type === Types.click || this.record.type === Types.blur) &&
            (this.record.filterToolbar?.includes("Сбросить") || this.record.filterToolbar?.includes("Очистить"))
        );
    }

    act(): boolean {
        const refreshBtn = document.querySelector(`div[class*="refresh__button"]`) as HTMLElement | null;
        if (refreshBtn === null) return false;
        refreshBtn.click();
        return true;
    }

    getMsgErr(): string {
        return `Ошибка "сбросить" фильтр"`;
    }
}
