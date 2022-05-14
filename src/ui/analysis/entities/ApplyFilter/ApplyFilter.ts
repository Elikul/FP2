import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//Нажать кнопку "Принять фильтр"
export class ApplyFilter extends CodeEntity {
    //если фильтр был уже открыт в текущей активной вкладке
    getPrevCode(): string {
        if (!this.prevRecord?.isFilter) {
            if (this.record.nameForm !== this.record.tab) {
                return [
                    `form_${this.form_name}.getSplitter().open();`,
                    `Panel panel_${this.panel_name} = form_${this.form_name}.getTabControl("${this.record.tabContainer}").activateTab("${this.record.tab}");`,
                    `FilterPanel filter_${this.panel_name} = panel_${this.panel_name}.getFilterPanel();\n`
                ].join("\n");
            }
            return [
                `form_${this.form_name}.getSplitter().open();`,
                `FilterPanel filter_${this.panel_name} = form_${this.form_name}.getFilterPanel();\n`
            ].join("\n");
        }
        return "";
    }

    isEntity(): boolean {
        return !!(
            this.record.filterToolbar !== undefined &&
            (this.record.type === Types.click || this.record.type === Types.blur) &&
            this.record.filterToolbar?.includes("Применить")
        );
    }

    getCode(): string {
        return this.getPrevCode() + `filter_${this.panel_name}.applyFilter();`;
    }
}
