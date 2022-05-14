import { NavigatorOpenForm } from "../NavigatorOpenForm";
import { OpenFormByDFD } from "../OpenFormByDFD";
import { ClickBigButton } from "../ClickBigButton";
import { ClickToolbarBigButton } from "../ClickToolbarBigButton";
import { SetActiveTab } from "../SetActiveTab";
import { CloseTab } from "../CloseTab";
import { RefreshTab } from "../RefreshTab";
import { FullScreenTab } from "../FullScreenTab";
import { MinimizeTab } from "../MinimizeTab";
import { ClickToolboxGridButton } from "../ClickToolboxGridButton";
import { SetValueInQuickFilter } from "../SetValueInQuickFilter";
import { SetValueInGridCell } from "../SetValueInGridCell";
import { ClearGridCell } from "../ClearGridCell";
import { ActivateFilter } from "../ActivateFilter";
import { SetFilterParameter } from "../SetFilterParameter";
import { ClearFilterParameter } from "../ClearFilterParameter";
import { ApplyFilter } from "../ApplyFilter";
import { ResetFilter } from "../ResetFilter";
import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { CodeEntity } from "../CodeEntity";
import { ApplyModalWindow } from "../ApplyModalWindow";
import { CloseModalWindow } from "../CloseModalWindow";

export class CodeEntityManager {
    //список сущностей
    static entities = [
        NavigatorOpenForm,
        OpenFormByDFD,
        ClickBigButton,
        ClickToolbarBigButton,
        SetActiveTab,
        CloseTab,
        RefreshTab,
        FullScreenTab,
        MinimizeTab,
        ClickToolboxGridButton,
        SetValueInQuickFilter,
        SetValueInGridCell,
        ClearGridCell,
        ActivateFilter,
        SetFilterParameter,
        ClearFilterParameter,
        ApplyFilter,
        ResetFilter,
        ApplyModalWindow,
        CloseModalWindow
    ];

    //найти нужную сущность из писка по определённым условиям сущностей
    findEntity(
        record: IUserActionType,
        prevElement?: IUserActionType,
        nextElement?: IUserActionType
    ): CodeEntity | undefined {
        for (let EntityClass of CodeEntityManager.entities) {
            const entity = new EntityClass(record, prevElement, nextElement);

            if (entity.isEntity()) {
                return entity;
            }
        }
    }

    //получить код нужной сущности
    getCode(record: IUserActionType, prevElement?: IUserActionType, nextElement?: IUserActionType): string {
        return this.findEntity(record, prevElement, nextElement)?.getCode() || "";
    }
}

export const entityManager = new CodeEntityManager();
