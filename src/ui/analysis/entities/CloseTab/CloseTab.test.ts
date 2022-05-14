import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { CloseTab } from "./CloseTab";

describe("Проверить генерацию кода для закртыие вкладки  (CloseTab)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616746524782,
        dfdNameForm: "Предметные классы",
        isFilter: false,
        nameForm: "CD_Top",
        navigator: undefined,
        tab: "Предметные классы",
        type: "close",
        ...props
    });

    const inputCurDataObject: IUserActionType = defaults();

    const inputPrevDataObject: IUserActionType = defaults({
        date: 1616746515435,
        type: "refresh"
    });

    const outputCode: string = "mainPage.getWorkArea().closeActiveTab();";

    it("Должно выполниться условие для сущности CloseTab", () => {
        expect(new CloseTab(inputCurDataObject, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код CloseTab", () => {
        expect(new CloseTab(inputCurDataObject, inputPrevDataObject).getCode()).toBe(outputCode);
    });
});
