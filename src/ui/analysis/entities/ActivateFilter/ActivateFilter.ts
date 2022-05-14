import { CodeEntity } from "../CodeEntity";
import { Types } from "../../../../agent/utils/forDefineUIComponents";

//открыть вкладку фильтра
export class ActivateFilter extends CodeEntity {
    getPrevCode(): string {
        return `form_${this.form_name}.getSplitter().open();\n`;
    }

    isEntity(): boolean {
        return !!(
            this.record.isFilter &&
            (this.record.type === Types.setActive || this.record.type === Types.slamming)
        );
    }

    getCode(): string {
        if (this.record.nameForm !== this.record.tab) {
            return [
                `Panel panel_${this.panel_name} = form_${this.form_name}.getTabControl("${this.record.tabContainer}").activateTab("${this.record.tab}");`,
                `FilterPanel filter_${this.panel_name} = panel_${this.panel_name}.getFilterPanel().resetFilter();\n`
            ].join("\n");
        }
        return (
            this.getPrevCode() +
            `FilterPanel filter_${this.panel_name} = form_${this.form_name}.getFilterPanel().resetFilter();`
        );
    }
}
