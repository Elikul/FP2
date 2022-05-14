import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { SetActiveTab } from "./SetActiveTab";

describe("Проверить генерацию кода для активации вкладки  (SetActiveTab)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616750087249,
        dfdNameForm: undefined,
        isFilter: false,
        nameForm: "Источники поступления целевых средств",
        navigator: undefined,
        tab: "Источники поступления целевых средств",
        type: "set active",
        ...props
    });

    const inputCurDataObject: IUserActionType = defaults();

    const inputPrevDataObject: IUserActionType = defaults({
        date: 1616750087225,
        nameForm: "Расходное расписание ФО ",
        tab: "Расходное расписание ФО ",
        type: "set active"
    });

    const outputCode: string = `FormUtils.activateTab(mainPage,"Источники поступления целевых средств");`;

    it("Должно выполниться условие для сущности SetActiveTab", () => {
        expect(new SetActiveTab(inputCurDataObject, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код SetActiveTab", () => {
        expect(new SetActiveTab(inputCurDataObject, inputPrevDataObject).getCode()).toBe(outputCode);
    });
});
