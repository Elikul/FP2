import { cleanup, fireEvent, render } from "@testing-library/react";
import { myIssueState } from "../../../../utils/test_util";
import ProviderWithComponent from "../../../../../store/ProviderWithComponent";
import SelectTestingDepartment from "../SelectTestingDepartment";
import { TestingDepartments } from "../../../../../../Redmine/redmineProjects/fk-asp";

describe("Testing department select component", function() {
    afterEach(cleanup);

    it("Должен срабатывать select с выбором опции отдела тестирования - ОТиКК", function() {
        const { getByLabelText } = render(
            ProviderWithComponent(() => <SelectTestingDepartment />)({
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    selectedProject: { value: 292, label: "АСП ФК" },
                    testingDepartment: { value: TestingDepartments.development, label: TestingDepartments.development }
                }
            })
        );

        const component = getByLabelText("testingDepartment") as HTMLSelectElement;
        fireEvent.change(component, { target: { value: TestingDepartments.ottik } });
        expect(component.value).toEqual(TestingDepartments.ottik);
    });
});
