import { cleanup, fireEvent, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { PriorityOfIssue } from "../../../../Redmine/redmineTypes";
import { myIssueState } from "../../utils/test_util";
import IssuePriority from "../IssuePriority";

describe("Issue priority component", function() {
    afterEach(cleanup);

    it("Должен срабатывать select с выбором опции немедленного приоритета", function() {
        const { getByLabelText } = render(
            ProviderWithComponent(() => <IssuePriority />)({
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    selectedProject: { value: 2, label: "Платформа" }
                }
            })
        );

        const priority = getByLabelText("priority") as HTMLSelectElement;
        fireEvent.change(priority, { target: { value: PriorityOfIssue.immediately } });
        expect(priority.value).toEqual(PriorityOfIssue.immediately.toString());
    });
});
