import { Types } from "../../../../agent/utils/forDefineUIComponents";
import { CodeEntity } from "../CodeEntity";

//открытие формы по dfd
export class OpenFormByDFD extends CodeEntity {
    isEntity(): boolean {
        return (
            this.record.type === Types.open &&
            this.record.nameForm !== undefined &&
            this.record.dfdNameForm !== undefined &&
            this.record.navigator === undefined
        );
    }

    getCode(): string {
        return `Form form_${this.form_name} = FormUtils.getFormByDFD(mainPage, "${this.record.dfdNameForm}", "${this.record.nameForm}");`;
    }
}
