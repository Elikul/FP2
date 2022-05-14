import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ApplyModalWindow } from "./ApplyModalWindow";

describe('Проверить генерацию кода для нажатие кнопки "применить" модального окна (ApplyModalWindow)', () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1619008037536,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: false,
        modalWindow: "Параметры наполнения",
        modalWindowButton: "Применить",
        nameForm: "Задачи сбора отчетности",
        quickFilter: undefined,
        tab: undefined,
        type: "click",
        value: undefined,
        xpath: "/HTML[1]/BODY[1]/DIV[8]/DIV[2]/DIV[3]/BUTTON[1]",
        ...props
    });

    const inputCurDataObject: IUserActionType = defaults();

    const outputCode: string = `mainPage.getModalWindow("Параметры наполнения").waitForLoadingWindow().ok();`;

    it("Должно выполниться условие для сущности ApplyModalWindow", () => {
        expect(new ApplyModalWindow(inputCurDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код ApplyModalWindow", () => {
        expect(new ApplyModalWindow(inputCurDataObject).getCode()).toBe(outputCode);
    });
});
