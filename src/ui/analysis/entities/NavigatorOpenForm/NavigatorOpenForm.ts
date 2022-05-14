import { Types } from "../../../../agent/utils/forDefineUIComponents";
import { CodeEntity } from "../CodeEntity";

// открытие формы из навигатора
export class NavigatorOpenForm extends CodeEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.open && this.record.nameForm !== undefined && this.record.navigator !== undefined
        );
    }

    getPostCode(): string {
        return `\nForm form_${this.form_name} = mainPage.getWorkArea().findForm("${this.record.nameForm}");`;
    }

    getCode(): string {
        return (
            `mainPage.getNavigator().openForm(${this.record.navigator}).waitForLoadingWindow();` + this.getPostCode()
        );
    }
}
