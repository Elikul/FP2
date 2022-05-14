import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { CloseModalWindow } from "./CloseModalWindow";

describe('Проверить генерацию кода для нажатие кнопки "закрыть" модального окна (CloseModalWindow)', () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1619008038504,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: false,
        modalWindow: "Результат наполнения задач",
        modalWindowButton: "Закрыть",
        nameForm: "Задачи сбора отчетности",
        quickFilter: undefined,
        tab: undefined,
        type: "click",
        value: undefined,
        xpath: "/HTML[1]/BODY[1]/DIV[8]/DIV[2]/DIV[3]/BUTTON[2]",
        ...props
    });

    const inputCurDataObject: IUserActionType = defaults();

    const outputCode: string = `mainPage.getModalWindow("Результат наполнения задач").waitForLoadingWindow().close();`;

    it("Должно выполниться условие для сущности CloseModalWindow", () => {
        expect(new CloseModalWindow(inputCurDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код CloseModalWindow", () => {
        expect(new CloseModalWindow(inputCurDataObject).getCode()).toBe(outputCode);
    });
});
