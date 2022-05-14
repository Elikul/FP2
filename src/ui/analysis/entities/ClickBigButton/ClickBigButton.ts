import { Types } from "../../../../agent/utils/forDefineUIComponents";
import { CodeEntity } from "../CodeEntity";

//нажатие по компоненту BigButton
export class ClickBigButton extends CodeEntity {
    getPrevCode(): string {
        if (this.record.tab !== this.prevRecord?.tab || this.prevRecord?.type === Types.setActive) {
            if (this.record.nameForm !== this.record.tab) {
                return `Panel panel_${this.panel_name} = form_${this.form_name}.getTabControl("${this.record.tabContainer}").activateTab("${this.record.tab}");\n`;
            }
        }
        return "";
    }

    isEntity(): boolean {
        return (
            this.record.type === Types.click &&
            this.record.bigButton !== undefined &&
            !this.record.bigButton?.includes(" v")
        );
    }

    getCode(): string {
        let container: string;

        if (this.getPrevCode() !== "") container = `panel_${this.panel_name}`;
        else container = `form_${this.form_name}`;
        return this.getPrevCode() + `ToolbarUtils.clickButton(${container},"${this.record.bigButton}");`;
    }
}
