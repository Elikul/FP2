import fetchMock from "jest-fetch-mock";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { myIssueState, testMembers } from "../../utils/test_util";
import SelectMemberProject from "../SelectMemberProject";

describe("Select member component", function() {
    beforeAll(() => {
        fetchMock.resetMocks();
    });

    afterEach(cleanup);

    it("Должен срабатывать select с выбором сотрудника, на которого будет назначена задача", async function() {
        fetchMock.mockResponseOnce(JSON.stringify({ memberships: testMembers }));

        const { getByLabelText, findByText } = render(
            ProviderWithComponent(() => <SelectMemberProject idProject={3} />)({
                IssueState: {
                    ...myIssueState,
                    showModalCreateIssue: true,
                    selectedMember: { value: 159, label: "Фокина Елена" }
                }
            })
        );

        const member = getByLabelText("member") as HTMLSelectElement;
        fireEvent.change(member, { target: { value: 159 } });
        expect(member.value).toEqual("159");

        let element = await findByText(/159/i);
        expect(element).toBeInTheDocument();

        fireEvent.change(member, { target: { value: 1278 } });
        expect(member.value).toEqual("1278");

        element = await findByText(/1278/i);
        expect(element).toBeInTheDocument();
    });
});
