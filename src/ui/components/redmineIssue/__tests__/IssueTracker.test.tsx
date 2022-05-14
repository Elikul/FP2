import fetchMock from "jest-fetch-mock";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { TrackerIssue } from "../../../../Redmine/redmineTypes";
import { myIssueState, testProjects } from "../../utils/test_util";
import IssueTracker from "../IssueTracker";

describe("Issue tracker component", function() {
    beforeAll(() => {
        fetchMock.resetMocks();
    });

    afterEach(cleanup);

    it("Должен срабатывать select с выбором опции трекера изменения", async function() {
        fetchMock.mockResponseOnce(JSON.stringify({ project: testProjects[0] }));

        const { getByLabelText, findByText } = render(
            ProviderWithComponent(() => <IssueTracker idProject={3} />)({
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    selectedProject: { value: 2, label: "Платформа" }
                }
            })
        );

        const member = getByLabelText("tracker") as HTMLSelectElement;
        fireEvent.change(member, { target: { value: TrackerIssue.change } });
        expect(member.value).toEqual("2");

        let element = await findByText(/2/i);
        expect(element).toBeInTheDocument();
    });
});
