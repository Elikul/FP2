import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { NavigatorOpenForm } from "./NavigatorOpenForm";

describe("Проверить генерацию кода для открытие формы через навигатор (NavigatorOpenForm)", () => {
    const inputCurDataObject: IUserActionType = {
        date: 1616748416647,
        dfdNameForm: "DFD_ClsRAZDLPODRAZDL",
        isFilter: false,
        nameForm: "Раздел, подраздел",
        navigator: '"Администратор справочников","Бюджетная классификация","Раздел, подраздел"',
        tab: "Все счета",
        type: "open"
    };

    const outputCode: string = [
        `mainPage.getNavigator().openForm("Администратор справочников","Бюджетная классификация","Раздел, подраздел").waitForLoadingWindow();`,
        `Form form_razd__podr = mainPage.getWorkArea().findForm("Раздел, подраздел");`
    ].join("\n");

    it("Должно выполниться условие для сущности NavigatorOpenForm", () => {
        expect(new NavigatorOpenForm(inputCurDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код NavigatorOpenForm", () => {
        expect(new NavigatorOpenForm(inputCurDataObject).getCode()).toBe(outputCode);
    });
});
