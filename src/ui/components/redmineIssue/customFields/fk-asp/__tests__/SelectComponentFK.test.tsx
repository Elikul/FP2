import { cleanup, fireEvent, render } from "@testing-library/react";
import { myIssueState } from "../../../../utils/test_util";
import ProviderWithComponent from "../../../../../store/ProviderWithComponent";
import SelectComponentFK from "../SelectComponentFK";
import { ComponentsFK } from "../../../../../../Redmine/redmineProjects/fk-asp";

describe("Component_FK select component", function() {
    afterEach(cleanup);

    it("Должен срабатывать select с выбором опции компонента (ФК АСП) - О/Регламентированная", function() {
        const { getByLabelText } = render(
            ProviderWithComponent(() => <SelectComponentFK />)({
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    selectedProject: { value: 292, label: "АСП ФК" },
                    componentFK: { value: ComponentsFK.analysisLoadP, label: ComponentsFK.analysisLoadP }
                }
            })
        );

        const component = getByLabelText("componentFK") as HTMLSelectElement;
        fireEvent.change(component, { target: { value: ComponentsFK.regulatedO } });
        expect(component.value).toEqual(ComponentsFK.regulatedO);
    });
});
