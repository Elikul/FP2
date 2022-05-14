import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { OpenFormByDFD } from "./OpenFormByDFD";

describe("Проверить генерацию кода для открытие формы по dfd (OpenFormByDFD)", () => {
    const inputCurDataObject: IUserActionType = {
        date: 1616748887897,
        dfdNameForm: "FD_FoExpendSchedule",
        isFilter: false,
        nameForm: "Расходное расписание ФО ",
        navigator: undefined,
        tab: "Стартовая страница",
        type: "open"
    };

    const outputCode: string = `Form form_rash_rasp_fo_ = FormUtils.getFormByDFD(mainPage, "FD_FoExpendSchedule", "Расходное расписание ФО ");`;

    it("Должно выполниться условие для сущности OpenFormByDFD", () => {
        expect(new OpenFormByDFD(inputCurDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код OpenFormByDFD", () => {
        expect(new OpenFormByDFD(inputCurDataObject).getCode()).toBe(outputCode);
    });
});
