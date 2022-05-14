import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//установить введённые значения в поле фильтра
export class SetFilterParameter extends CodeEntity {
    //если фильтр был уже открыт в текущей активной вкладке
    getPrevCode(): string {
        if (!this.prevRecord?.isFilter) {
            if (this.record.nameForm !== this.record.tab) {
                return [
                    `form_${this.form_name}.getSplitter().open();`,
                    `Panel panel_${this.panel_name} = form_${this.form_name}.getTabControl("${this.record.tabContainer}").activateTab("${this.record.tab}");`,
                    `FilterPanel filter_${this.panel_name} = panel_${this.panel_name}.getFilterPanel().resetFilter();\n`
                ].join("\n");
            }
            return [
                `form_${this.form_name}.getSplitter().open();`,
                `FilterPanel filter_${this.panel_name} = form_${this.form_name}.getFilterPanel().resetFilter();\n`
            ].join("\n");
        }
        return "";
    }

    isEntity(): boolean {
        return (
            this.record.filterCaption !== undefined &&
            (this.record.type === Types.change ||
                this.record.type === Types.blur ||
                this.record.type === Types.checked ||
                this.record.type === Types.unchecked) &&
            this.record.value !== "" &&
            this.record.value !== undefined
        );
    }

    getCode(): string {
        return (
            this.getPrevCode() +
            `filter_${this.panel_name}.getFilterParameter("${this.record.filterCaption}").setInputParameter("${this.record.value}");`
        );
    }
}
