import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ClickToolboxGridButton } from "./ClickToolboxGridButton";

describe("Проверить генерацию кода для нажатий по кнопокам toolbox грида (ClickToolboxGridButton)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        bigButton: undefined,
        date: 1616671743737,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: "GD_DomainClassInfo",
        gridCellCol: undefined,
        gridCellRow: undefined,
        gridToolbar: "Быстрый фильтр",
        isFilter: false,
        nameForm: "Предметные классы",
        quickFilter: undefined,
        tab: "Предметные классы",
        type: "click",
        value: undefined,
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]",
        ...props
    });

    const nextRecord = {
        bigButton: undefined,
        date: 1616671743738,
        filterCaption: undefined,
        filterToolbar: undefined,
        grid: "GD_DomainClassInfo",
        gridCellCol: "Периодичность",
        gridCellRow: "12",
        gridToolbar: undefined,
        isFilter: false,
        nameForm: "Предметные классы",
        quickFilter: undefined,
        tab: "Предметные классы",
        type: "change",
        value: "Годовая",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]"
    };

    const inputCurDataObjectQuickFilter: IUserActionType = defaults();

    const inputCurDataObjectRefresh: IUserActionType = defaults({
        gridToolbar: "Обновить данные"
    });

    const inputCurDataObjectAddRow: IUserActionType = defaults({
        gridToolbar: "Добавить запись"
    });

    const inputCurDataObjectEditRow: IUserActionType = defaults({
        gridToolbar: "Редактировать запись"
    });

    const inputCurDataObjectCommit: IUserActionType = defaults({
        gridToolbar: "Принять изменения"
    });

    const inputCurDataObjectRollback: IUserActionType = defaults({
        gridToolbar: "Отменить изменения"
    });

    const inputCurDataObjectDeleteRow: IUserActionType = defaults({
        gridToolbar: "Удалить запись"
    });

    const inputCurDataObjectFirstPage: IUserActionType = defaults({
        gridToolbar: "К первой странице"
    });

    const inputCurDataObjectPrevPage: IUserActionType = defaults({
        gridToolbar: "К предыдущей странице"
    });

    const inputCurDataObjectNextPage: IUserActionType = defaults({
        gridToolbar: "К следующей странице"
    });

    const inputCurDataObjectLastPage: IUserActionType = defaults({
        gridToolbar: "К последней странице"
    });

    const inputCurDataObjectNextRow: IUserActionType = defaults({
        gridToolbar: "К следующей записи"
    });

    const inputCurDataObjectPrevRow: IUserActionType = defaults({
        gridToolbar: "К предыдущей записи"
    });

    const inputCurDataObjectUseCardMode: IUserActionType = defaults({
        gridToolbar: "Режим карточки"
    });

    const inputPrevDataObjectGridWas: IUserActionType = defaults({
        date: 1616671239134,
        quickFilter: "Наименование",
        type: "blur",
        value: "",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/INPUT[1]"
    });

    const inputPrevDataObjectGridWasNot: IUserActionType = defaults({
        grid: "GD_SettingsNode_1",
        date: 1616671239134,
        gridCellCol: "Наименование",
        type: "change",
        value: "",
        xpath:
            "/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[2]/TD[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[2]/DIV[5]/DIV[1]/DIV[1]/DIV[2]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[1]/DIV[2]/INPUT[1]"
    });

    const outputCodeQuickFilter: string = `toolbox_GD_DomainClassInfo.quickFilter();`;
    const outputCodeWithPrevCode: string = [
        `Grid grid_GD_DomainClassInfo = GridUtils.getGridByTabName(form_pred_klas,"Предметные классы");`,
        `GridToolbox toolbox_GD_DomainClassInfo = grid_GD_DomainClassInfo.toolbox();`,
        `toolbox_GD_DomainClassInfo.quickFilter();`
    ].join("\n");
    const outputCodeRefresh: string = `toolbox_GD_DomainClassInfo.refresh();`;
    const outputCodeAddRow: string = `toolbox_GD_DomainClassInfo.addRow();`;
    const outputCodeCommit: string = `toolbox_GD_DomainClassInfo.commit();`;
    const outputCodeRollback: string = `toolbox_GD_DomainClassInfo.rollback();`;
    const outputCodeDeleteRow: string = `toolbox_GD_DomainClassInfo.deleteRow();`;
    const outputCodeFirstPage: string = `toolbox_GD_DomainClassInfo.firstPage();`;
    const outputCodePrevPage: string = `toolbox_GD_DomainClassInfo.prevPage();`;
    const outputCodeNextPage: string = `toolbox_GD_DomainClassInfo.nextPage();`;
    const outputCodeLastPage: string = `toolbox_GD_DomainClassInfo.lastPage();`;
    const outputCodeNextRow: string = `toolbox_GD_DomainClassInfo.nextRow();`;
    const outputCodePrevRow: string = `toolbox_GD_DomainClassInfo.prevRow();`;
    const outputCodeUseCardMode: string = `toolbox_GD_DomainClassInfo.useCardMode();`;
    const outputCodeEditRow: string = [
        `GridRow row_12 = grid_GD_DomainClassInfo.findRowByIndex(12);`,
        `toolbox_GD_DomainClassInfo.editRow(row_12);`
    ].join("\n");
    const outputCodeEditRowNoGrid: string = [
        `Grid grid_GD_DomainClassInfo = GridUtils.getGridByTabName(form_pred_klas,"Предметные классы");`,
        `GridToolbox toolbox_GD_DomainClassInfo = grid_GD_DomainClassInfo.toolbox();`,
        `GridRow row_12 = grid_GD_DomainClassInfo.findRowByIndex(12);`,
        `toolbox_GD_DomainClassInfo.editRow(row_12);`
    ].join("\n");

    it("Должно выполниться условие для сущности ClickToolboxGridButton", () => {
        expect(
            new ClickToolboxGridButton(inputCurDataObjectQuickFilter, inputPrevDataObjectGridWas).isEntity()
        ).toBeTruthy();
    });

    it("Должен выдать код ClickToolboxGridButton быстрый фильтр с до кодом получения грида", () => {
        expect(
            new ClickToolboxGridButton(inputCurDataObjectQuickFilter, inputPrevDataObjectGridWasNot).getCode()
        ).toEqual(outputCodeWithPrevCode);
    });

    it("Должен выдать код ClickToolboxGridButton быстрый фильтр", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectQuickFilter, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeQuickFilter
        );
    });

    it("Должен выдать код ClickToolboxGridButton обновление грида", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectRefresh, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeRefresh
        );
    });

    it("Должен выдать код ClickToolboxGridButton добавить строку в грид", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectAddRow, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeAddRow
        );
    });

    it("Должен выдать код ClickToolboxGridButton удалить выбранную строку грида", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectDeleteRow, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeDeleteRow
        );
    });

    it("Должен выдать код ClickToolboxGridButton подтвердить изменения", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectCommit, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeCommit
        );
    });

    it("Должен выдать код ClickToolboxGridButton откатить изменения", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectRollback, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeRollback
        );
    });

    it("Должен выдать код ClickToolboxGridButton вернуться к первой странице", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectFirstPage, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeFirstPage
        );
    });

    it("Должен выдать код ClickToolboxGridButton вернуться к последней странице", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectLastPage, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeLastPage
        );
    });

    it("Должен выдать код ClickToolboxGridButton к следующей странице", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectNextPage, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeNextPage
        );
    });

    it("Должен выдать код ClickToolboxGridButton к предыдущей странице", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectPrevPage, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodePrevPage
        );
    });

    it("Должен выдать код ClickToolboxGridButton к следующей записи", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectNextRow, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeNextRow
        );
    });

    it("Должен выдать код ClickToolboxGridButton к предыдущей записи", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectPrevRow, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodePrevRow
        );
    });

    it("Должен выдать код ClickToolboxGridButton включить режим карточки", () => {
        expect(new ClickToolboxGridButton(inputCurDataObjectUseCardMode, inputPrevDataObjectGridWas).getCode()).toBe(
            outputCodeUseCardMode
        );
    });

    it("Должен выдать код ClickToolboxGridButton редактировать запись", () => {
        expect(
            new ClickToolboxGridButton(inputCurDataObjectEditRow, inputPrevDataObjectGridWas, nextRecord).getCode()
        ).toBe(outputCodeEditRow);
    });

    it("Должен выдать код ClickToolboxGridButton редактировать запись с до кодом получения грида", () => {
        expect(
            new ClickToolboxGridButton(inputCurDataObjectEditRow, inputPrevDataObjectGridWasNot, nextRecord).getCode()
        ).toBe(outputCodeEditRowNoGrid);
    });
});
