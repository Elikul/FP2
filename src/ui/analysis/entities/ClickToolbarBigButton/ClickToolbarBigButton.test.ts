import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ClickToolbarBigButton } from "./ClickToolbarBigButton";

describe("Проверить генерацию кода для клика по big button scroll (ClickToolbarBigButton)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: "Экспорт всех предметных классов v",
        date: 1616671239134,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: undefined,
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: undefined,
        isFilter: false,
        nameForm: "Предметные классы",
        quickFilter: undefined,
        tab: "Предметные классы",
        type: "click",
        value: undefined,
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[1]/DIV[3]/DIV[3]/DIV[3]/DIV[1]/DIV[1]/DIV[1]",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults();
    const inputCurDataObjectPanel: IUserActionType = defaults({
        tab: "Наборы классификации",
        tabContainer: "TCD_SystemDetail"
    });

    const inputPrevDataObject: IUserActionType = defaults({
        bigButton: "Экспортировать документы",
        date: 1616671237213
    });

    const outputCodeForm: string = `ToolbarUtils.clickToolbarButton(form_pred_klas,"Экспортировать документы","Экспорт всех предметных классов");`;

    const outputCodePanel: string = [
        `Panel panel_nabo_klas = form_pred_klas.getTabControl("TCD_SystemDetail").activateTab("Наборы классификации");`,
        `ToolbarUtils.clickToolbarButton(panel_nabo_klas,"Экспортировать документы","Экспорт всех предметных классов");`
    ].join("\n");

    it("Должно выполниться условие для сущности ClickToolbarBigButton формы", () => {
        expect(new ClickToolbarBigButton(inputCurDataObjectForm, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должно выполниться условие для сущности ClickToolbarBigButton вложенного таба", () => {
        expect(new ClickToolbarBigButton(inputCurDataObjectPanel, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код ClickToolbarBigButton формы", () => {
        expect(new ClickToolbarBigButton(inputCurDataObjectForm, inputPrevDataObject).getCode()).toBe(outputCodeForm);
    });

    it("Должен выдать код ClickToolbarBigButton вложенного таба", () => {
        expect(new ClickToolbarBigButton(inputCurDataObjectPanel, inputPrevDataObject).getCode()).toBe(outputCodePanel);
    });
});
