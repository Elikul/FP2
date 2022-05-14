import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ClickBigButton } from "./ClickBigButton";

describe("Проверить генерацию кода для клика по bigButton (ClickBigButton)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: "Заполнить маппинг настроек формы",
        date: 1616670870805,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: false,
        nameForm: "Выполнение пакетной замены",
        quickFilter: undefined,
        tab: "Выполнение пакетной замены",
        type: "click",
        value: undefined,
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[1]/DIV[2]/DIV[1]",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults();

    const inputCurDataObjectPanel: IUserActionType = defaults({
        tab: "Правила замены",
        tabContainer: "TCD_SystemDetail"
    });

    const inputPrevDataObject: IUserActionType = defaults({
        bigButton: undefined,
        date: 1616670282537
    });

    const outputCodeForm: string = `ToolbarUtils.clickButton(form_vypo_pake_zame,"Заполнить маппинг настроек формы");`;
    const outputCodePanel: string = [
        `Panel panel_prav_zame = form_vypo_pake_zame.getTabControl("TCD_SystemDetail").activateTab("Правила замены");`,
        `ToolbarUtils.clickButton(panel_prav_zame,"Заполнить маппинг настроек формы");`
    ].join("\n");

    it("Должно выполниться условие для сущности ClickBigButton формы", () => {
        expect(new ClickBigButton(inputCurDataObjectForm, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должно выполниться условие для сущности ClickBigButton вложенного таба", () => {
        expect(new ClickBigButton(inputCurDataObjectPanel, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код ClickBigButton формы", () => {
        expect(new ClickBigButton(inputCurDataObjectForm, inputPrevDataObject).getCode()).toEqual(outputCodeForm);
    });

    it("Должен выдать код ClickBigButton вложенного таба", () => {
        expect(new ClickBigButton(inputCurDataObjectPanel, inputPrevDataObject).getCode()).toEqual(outputCodePanel);
    });
});
