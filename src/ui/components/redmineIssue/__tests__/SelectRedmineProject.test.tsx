import fetchMock from "jest-fetch-mock";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { myIssueState, testProjects } from "../../utils/test_util";
import SelectRedmineProject from "../SelectRedmineProject";

describe("Select project component", function() {
    beforeAll(() => {
        fetchMock.resetMocks();
    });

    afterEach(cleanup);

    it("Должен срабатывать select с выбором проекта", async function() {
        fetchMock.mockResponseOnce(JSON.stringify({ projects: testProjects }));

        const { getByLabelText, findByText } = render(
            ProviderWithComponent(() => <SelectRedmineProject />)({
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    selectedProject: { value: 2, label: "Платформа" }
                }
            })
        );

        const project = getByLabelText("project") as HTMLSelectElement;
        fireEvent.change(project, { target: { value: 2 } });
        expect(project.value).toEqual("2");

        let element = await findByText(/2/i);
        expect(element).toBeInTheDocument();

        fireEvent.change(project, { target: { value: 241 } });
        expect(project.value).toEqual("241");

        element = await findByText(/241/i);
        expect(element).toBeInTheDocument();
    });
});
