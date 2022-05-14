import { entityManager } from "./CodeEntityManager";
import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { ActivateFilter } from "../ActivateFilter";
import { ApplyFilter } from "../ApplyFilter";
import { ClearFilterParameter } from "../ClearFilterParameter";
import { ClearGridCell } from "../ClearGridCell";
import { ClickBigButton } from "../ClickBigButton";
import { ClickToolbarBigButton } from "../ClickToolbarBigButton";
import { ClickToolboxGridButton } from "../ClickToolboxGridButton";
import { CloseTab } from "../CloseTab";
import { FullScreenTab } from "../FullScreenTab";
import { MinimizeTab } from "../MinimizeTab";
import { NavigatorOpenForm } from "../NavigatorOpenForm";
import { OpenFormByDFD } from "../OpenFormByDFD";
import { RefreshTab } from "../RefreshTab";
import { ResetFilter } from "../ResetFilter";
import { SetActiveTab } from "../SetActiveTab";
import { SetFilterParameter } from "../SetFilterParameter";
import { SetValueInGridCell } from "../SetValueInGridCell";
import { SetValueInQuickFilter } from "../SetValueInQuickFilter";
import { ApplyModalWindow } from "../ApplyModalWindow";
import { CloseModalWindow } from "../CloseModalWindow";

describe("Получение кода нужной сущности при конкретных объектах данных", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616753631957,
        type: "",
        nameForm: "Формирование бюджетной отчетности",
        dfdNameForm: undefined,
        tab: "История обработки",
        bigButton: undefined,
        grid: undefined,
        gridToolbar: undefined,
        gridCellRow: undefined,
        gridCellCol: undefined,
        quickFilter: undefined,
        isFilter: false,
        filterToolbar: undefined,
        filterCaption: undefined,
        navigator: undefined,
        modalWindow: undefined,
        modalWindowButton: undefined,
        value: undefined,
        xpath: undefined,
        ...props
    });

    describe("ActivateFilter", () => {
        const inputCurDataObjectActivateFilter: IUserActionType = defaults({
            isFilter: true,
            type: "slamming"
        });

        it("Должен найти сущность ActivateFilter", () => {
            expect(entityManager.findEntity(inputCurDataObjectActivateFilter)).toBeInstanceOf(ActivateFilter);
        });
    });

    describe("ApplyFilter", () => {
        const inputCurDataObjectApplyFilter: IUserActionType = defaults({
            filterToolbar: "Применить фильтр",
            type: "click"
        });

        it("Должен найти сущность ApplyFilter", () => {
            expect(entityManager.findEntity(inputCurDataObjectApplyFilter)).toBeInstanceOf(ApplyFilter);
        });
    });

    describe("ClearFilterParameter", () => {
        const inputCurDataObjectClearFilterParameter: IUserActionType = defaults({
            filterCaption: "Форма бюджетной отчетности",
            type: "change",
            value: ""
        });

        it("Должен найти сущность ClearFilterParameter", () => {
            expect(entityManager.findEntity(inputCurDataObjectClearFilterParameter)).toBeInstanceOf(
                ClearFilterParameter
            );
        });
    });

    describe("ClearGridCell", () => {
        const inputCurDataObjectClearGridCell: IUserActionType = defaults({
            grid: "GD_ReplacementConfiguration",
            gridCellCol: "Генерация",
            gridCellRow: "10",
            nameForm: "Формирование бюджетной отчетности",
            tab: "Конфигурация пакетной замены",
            type: "blur",
            value: ""
        });

        it("Должен найти сущность ClearFilterParameter", () => {
            expect(entityManager.findEntity(inputCurDataObjectClearGridCell)).toBeInstanceOf(ClearGridCell);
        });
    });

    describe("ClickBigButton", () => {
        const inputCurDataObjectClickBigButton: IUserActionType = defaults({
            bigButton: "Заполнить маппинг настроек формы",
            type: "click"
        });

        it("Должен найти сущность ClickBigButton", () => {
            expect(entityManager.findEntity(inputCurDataObjectClickBigButton)).toBeInstanceOf(ClickBigButton);
        });
    });

    describe("ClickToolbarBigButton", () => {
        const inputCurDataObjectClickToolbarBigButton: IUserActionType = defaults({
            bigButton: "Назначить исполнителя задачи редактирования v",
            type: "click"
        });

        const inputPrevDataObjectClickToolbarBigButton: IUserActionType = defaults({
            bigButton: "Модерирование задач",
            type: "click"
        });

        it("Должен найти сущность ClickToolbarBigButton", () => {
            expect(
                entityManager.findEntity(
                    inputCurDataObjectClickToolbarBigButton,
                    inputPrevDataObjectClickToolbarBigButton
                )
            ).toBeInstanceOf(ClickToolbarBigButton);
        });
    });

    describe("ClickToolboxGridButton", () => {
        const inputCurDataObjectClickToolboxGridButton: IUserActionType = defaults({
            grid: "GD_ConsReport",
            gridToolbar: "Обновить данные",
            type: "click"
        });

        it("Должен найти сущность ClickToolboxGridButton", () => {
            expect(entityManager.findEntity(inputCurDataObjectClickToolboxGridButton)).toBeInstanceOf(
                ClickToolboxGridButton
            );
        });
    });

    describe("CloseTab", () => {
        const inputCurDataObjectCloseTab: IUserActionType = defaults({
            dfdNameForm: "Формирование бюджетной отчетности",
            nameForm: "CD_Top",
            tab: "Формирование бюджетной отчетности",
            type: "close"
        });

        it("Должен найти сущность CloseTab", () => {
            expect(entityManager.findEntity(inputCurDataObjectCloseTab)).toBeInstanceOf(CloseTab);
        });
    });

    describe("FullScreenTab", () => {
        const inputCurDataObjectFullScreenTab: IUserActionType = defaults({
            type: "fullscreen"
        });

        it("Должен найти сущность FullScreenTab", () => {
            expect(entityManager.findEntity(inputCurDataObjectFullScreenTab)).toBeInstanceOf(FullScreenTab);
        });
    });

    describe("MinimizeTab", () => {
        const inputCurDataObjectMinimizeTab: IUserActionType = defaults({
            type: "minimize"
        });

        it("Должен найти сущность MinimizeTab", () => {
            expect(entityManager.findEntity(inputCurDataObjectMinimizeTab)).toBeInstanceOf(MinimizeTab);
        });
    });

    describe("NavigatorOpenForm", () => {
        const inputCurDataObjectNavigatorOpenForm: IUserActionType = defaults({
            navigator: "Бюджетная отчетность, Формирование бюджетной отчетности, ",
            type: "open"
        });

        it("Должен найти сущность NavigatorOpenForm", () => {
            expect(entityManager.findEntity(inputCurDataObjectNavigatorOpenForm)).toBeInstanceOf(NavigatorOpenForm);
        });
    });

    describe("OpenFormByDFD", () => {
        const inputCurDataObjectOpenFormByDFD: IUserActionType = defaults({
            dfdNameForm: "FD_ConsReport",
            type: "open"
        });

        it("Должен найти сущность OpenFormByDFD", () => {
            expect(entityManager.findEntity(inputCurDataObjectOpenFormByDFD)).toBeInstanceOf(OpenFormByDFD);
        });
    });

    describe("RefreshTab", () => {
        const inputCurDataObjectRefreshTab: IUserActionType = defaults({
            dfdNameForm: "Формирование бюджетной отчетности",
            tab: "Формирование бюджетной отчетности",
            type: "refresh"
        });

        it("Должен найти сущность RefreshTab", () => {
            expect(entityManager.findEntity(inputCurDataObjectRefreshTab)).toBeInstanceOf(RefreshTab);
        });
    });

    describe("ResetFilter", () => {
        const inputCurDataObjectResetFilter: IUserActionType = defaults({
            filterToolbar: "Сбросить все параметры",
            nameForm: "CD_Top",
            tab: "Формирование бюджетной отчетности",
            type: "click"
        });

        it("Должен найти сущность ResetFilter", () => {
            expect(entityManager.findEntity(inputCurDataObjectResetFilter)).toBeInstanceOf(ResetFilter);
        });
    });

    describe("SetActiveTab", () => {
        const inputCurDataObjectSetActiveTab: IUserActionType = defaults({
            tab: "Параметры",
            type: "set active"
        });

        it("Должен найти сущность SetActiveTab", () => {
            expect(entityManager.findEntity(inputCurDataObjectSetActiveTab)).toBeInstanceOf(SetActiveTab);
        });
    });

    describe("SetFilterParameter", () => {
        const inputCurDataObjectSetFilterParameter: IUserActionType = defaults({
            filterCaption: "Состояние",
            nameForm: "CD_Top",
            type: "change",
            value: "Создан"
        });

        it("Должен найти сущность SetFilterParameter", () => {
            expect(entityManager.findEntity(inputCurDataObjectSetFilterParameter)).toBeInstanceOf(SetFilterParameter);
        });
    });

    describe("SetValueInGridCell", () => {
        const inputCurDataObjectSetValueInGridCell: IUserActionType = defaults({
            grid: "GD_ReplacementConfiguration",
            gridCellCol: "Минимальная сила препятствующих документов",
            gridCellRow: "10",
            nameForm: "Конфигурация пакетной замены",
            tab: "Конфигурация пакетной замены",
            type: "blur",
            value: "145"
        });

        it("Должен найти сущность SetValueInGridCell", () => {
            expect(entityManager.findEntity(inputCurDataObjectSetValueInGridCell)).toBeInstanceOf(SetValueInGridCell);
        });
    });

    describe("SetValueInQuickFilter", () => {
        const inputCurDataObjectSetValueInQuickFilter: IUserActionType = defaults({
            tab: "Формирование бюджетной отчетности",
            grid: "GD_ConsReport",
            quickFilter: "Дата формирования",
            type: "change",
            value: "10.03.2021"
        });

        it("Должен найти сущность SetValueInQuickFilter", () => {
            expect(entityManager.findEntity(inputCurDataObjectSetValueInQuickFilter)).toBeInstanceOf(
                SetValueInQuickFilter
            );
        });
    });

    describe("ApplyModalWindow", () => {
        const inputCurDataObjectApplyModalWindow: IUserActionType = defaults({
            modalWindow: "Параметры наполнения",
            modalWindowButton: "Применить",
            type: "click"
        });

        it("Должен найти сущность ApplyModalWindow", () => {
            expect(entityManager.findEntity(inputCurDataObjectApplyModalWindow)).toBeInstanceOf(ApplyModalWindow);
        });
    });

    describe("CloseModalWindow", () => {
        const inputCurDataObjectCloseModalWindow: IUserActionType = defaults({
            modalWindow: "Проверить отчёты",
            modalWindowButton: "Закрыть",
            type: "click"
        });

        it("Должен найти сущность CloseModalWindow", () => {
            expect(entityManager.findEntity(inputCurDataObjectCloseModalWindow)).toBeInstanceOf(CloseModalWindow);
        });
    });
});
