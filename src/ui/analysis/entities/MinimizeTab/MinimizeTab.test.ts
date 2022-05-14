import { IUserActionType } from "../../../../indexedDB/indexeddb";
import { MinimizeTab } from "./MinimizeTab";

describe("Проверить генерацию кода для уменьшения размера  вкладки (MinimizeTab)", () => {
    const defaults = (props?: Partial<IUserActionType>) => ({
        date: 1616747963704,
        dfdNameForm: undefined,
        isFilter: false,
        nameForm: "Лица",
        navigator: undefined,
        tab: "Лица",
        tabContainer: "node2",
        type: "minimize",
        ...props
    });

    const inputCurDataObjectForm: IUserActionType = defaults();

    const inputCurDataObjectPanel: IUserActionType = defaults({
        tab: "Все счета",
        tabContainer: "TCD_Details"
    });

    const inputPrevDataObject: IUserActionType = defaults({
        date: 1616747962263,
        type: "fullscreen"
    });

    const outputCode: string = `mainPage.getWorkArea().setMaximized(false);`;
    const outputCodeWithPrevCode: string = [
        `form_lica.getTabControl("TCD_Details").activateTab("Все счета");`,
        `form_lica.getTabControl("TCD_Details").setMaximized(false);`
    ].join("\n");

    it("Должно выполниться условие для сущности MinimizeTab формы", () => {
        expect(new MinimizeTab(inputCurDataObjectForm, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должно выполниться условие для сущности MinimizeTab вложенного таба", () => {
        expect(new MinimizeTab(inputCurDataObjectPanel, inputPrevDataObject).isEntity()).toBeTruthy();
    });

    it("Должен выдать код MinimizeTab для формы", () => {
        expect(new MinimizeTab(inputCurDataObjectForm, inputPrevDataObject).getCode()).toBe(outputCode);
    });

    it("Должен выдать код MinimizeTab для вложенного таба", () => {
        expect(new MinimizeTab(inputCurDataObjectPanel, inputPrevDataObject).getCode()).toBe(outputCodeWithPrevCode);
    });
});
