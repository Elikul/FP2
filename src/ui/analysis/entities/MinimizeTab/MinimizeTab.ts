import { Types } from "../../../../agent/utils/forDefineUIComponents";
import { CodeEntity } from "../CodeEntity";

//уменьшить размер вкладки
export class MinimizeTab extends CodeEntity {
    //получить текущий сплитер и панель
    getPrevCode(): string {
        if (
            this.record.nameForm !== this.record.tab ||
            this.record.tab !== this.prevRecord?.tab ||
            this.prevRecord?.tab === undefined
        )
            return `form_${this.form_name}.getTabControl("${this.record.tabContainer}").activateTab("${this.record.tab}");\n`;
        return "";
    }

    isEntity(): boolean {
        return (
            this.record.type === Types.minimize && this.record.tab !== undefined && this.record.nameForm !== undefined
        );
    }

    getCode(): string {
        if (this.getPrevCode() !== "") {
            return (
                this.getPrevCode() +
                `form_${this.form_name}.getTabControl("${this.record.tabContainer}").setMaximized(false);`
            );
        }
        return `mainPage.getWorkArea().setMaximized(false);`;
    }
}
