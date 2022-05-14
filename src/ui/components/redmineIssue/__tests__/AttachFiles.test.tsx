import { cleanup, fireEvent, render } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import { PriorityOfIssue, TrackerIssue } from "../../../../Redmine/redmineTypes";
import { myIssueState } from "../../utils/test_util";
import AttachFiles from "../AttachFiles";

const IMG_SRC: string =
    "https://images.pexels.com/photos/2575279/pexels-photo-2575279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const SRC_DOC_IMG: string = "/resources/doc_img.jpg";

describe("Attach files component", function() {
    afterEach(cleanup);

    it("Должен отображать на форме прикреплённые файлы", function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <AttachFiles />)({
                IssueState: {
                    ...myIssueState,
                    issueTracker: { value: TrackerIssue.error, label: "Ошибка" },
                    issuePriority: { value: PriorityOfIssue.low, label: "Низкий" },
                    showModalCreateIssue: true,
                    selectedProject: { value: 2, label: "Платформа" },
                    attachments: [
                        { file: new File([], "image"), src: IMG_SRC },
                        { file: new File([], "doc"), src: SRC_DOC_IMG }
                    ]
                }
            })
        );

        const file0 = getByTestId("file0") as HTMLElement;
        const file1 = getByTestId("file1") as HTMLElement;

        expect(file0.getAttribute("src")).toEqual(IMG_SRC);
        expect(file0.getAttribute("alt")).toEqual("image");

        expect(file1.getAttribute("src")).toEqual(SRC_DOC_IMG);
        expect(file1.getAttribute("alt")).toEqual("doc");

        //удаляем оба скриншота
        fireEvent.click(getByTestId("delete-file0"));
        //после удаления прошлого скриншота этот с индексом 1 станет с 0 индексом
        fireEvent.click(getByTestId("delete-file0"));

        expect(file0).not.toBeInTheDocument();
        expect(file1).not.toBeInTheDocument();
    });
});
