import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//Нажать кнопку "Сбросить фильтр"
export class ResetFilter extends CodeEntity {
    //если фильтр был уже открыт в текущей активной вкладке
    getPrevCode(): string {
        if (!this.prevRecord?.isFilter) {
            return `FilterPanel filter_${this.panel_name} = form_${this.form_name}.getFilterPanel().resetFilter();\n`;
        }

        return "";
    }

    isEntity(): boolean {
        return (
            this.record.filterToolbar !== undefined &&
            (this.record.type === Types.click || this.record.type === Types.blur) &&
            (this.record.filterToolbar?.includes("Сбросить") || this.record.filterToolbar?.includes("Очистить"))
        );
    }

    getCode(): string {
        return this.getPrevCode() + `filter_${this.panel_name}.resetFilter();`;
    }
}
