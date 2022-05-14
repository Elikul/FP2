import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ResetFilter } from "./ResetFilter";

describe("Проверить генерацию кода для сброса фильтра(ResetFilter)", () => {
    const defaultsCur = (props?: Partial<IUserActionType>) => ({
        date: 1616581405876,
        filterCaption: undefined,
        filterToolbar: "Сбросить фильтр",
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: true,
        nameForm: "Конфигурация пакетной замены",
        quickFilter: undefined,
        tab: "Конфигурация пакетной замены",
        type: "click",
        value: undefined,
        xpath: "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]",
        ...props
    });

    const inputCurDataObjectClick: IUserActionType = defaultsCur();

    const inputCurDataObjectBlur: IUserActionType = defaultsCur({
        date: 1616581405876,
        filterToolbar: "Очистить фильтр",
        type: "blur"
    });

    const inputPrevDataObjectFilterTrue: IUserActionType = {
        date: 1616580570305,
        isFilter: true,
        tab: "Конфигурация пакетной замены",
        type: "slamming"
    };

    const inputPrevDataObjectFilterFalse: IUserActionType = {
        date: 1616580566233,
        isFilter: false,
        type: "set active"
    };

    const outputCode: string = `filter_konf_pake_zame.resetFilter();`;
    const outputCodeWithPrevCode: string = [
        `FilterPanel filter_konf_pake_zame = form_konf_pake_zame.getFilterPanel().resetFilter();`,
        `filter_konf_pake_zame.resetFilter();`
    ].join("\n");

    it("Должно выполниться условие для сущности ResetFilter", () => {
        expect(new ResetFilter(inputCurDataObjectClick, inputPrevDataObjectFilterTrue).isEntity()).toBeTruthy();
    });

    it("Должен выдавать код ResetFilter", () => {
        expect(new ResetFilter(inputCurDataObjectClick, inputPrevDataObjectFilterTrue).getCode()).toBe(outputCode);
    });

    it("Должен выдавать код ResetFilter с до кодом открытия вкладки фильтра", () => {
        expect(new ResetFilter(inputCurDataObjectBlur, inputPrevDataObjectFilterFalse).getCode()).toBe(
            outputCodeWithPrevCode
        );
    });
});
