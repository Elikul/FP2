import { cleanup, fireEvent, render } from "@testing-library/react";
import { myIssueState } from "../../../../utils/test_util";
import ProviderWithComponent from "../../../../../store/ProviderWithComponent";
import SelectDecisionType from "../SelectDecisionType";
import { DecisionTypes } from "../../../../../../Redmine/redmineProjects/fk-asp";

describe("Decision type select component", function() {
    afterEach(cleanup);

    it("Должен срабатывать select с выбором опции типа решения - Доработка интерфейса ввода", function() {
        const { getByLabelText } = render(
            ProviderWithComponent(() => <SelectDecisionType />)({
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    selectedProject: { value: 292, label: "АСП ФК" },
                    decisionType: { value: DecisionTypes.reworkOPZ, label: DecisionTypes.reworkOPZ }
                }
            })
        );

        const component = getByLabelText("decisionType") as HTMLSelectElement;
        fireEvent.change(component, { target: { value: DecisionTypes.reworkInputUI } });
        expect(component.value).toEqual(DecisionTypes.reworkInputUI);
    });
});
