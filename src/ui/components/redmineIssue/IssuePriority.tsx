import { FC, memo, useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { setIssuePriority } from "../../actions/issueAction";
import { PriorityOfIssue } from "../../../Redmine/redmineTypes";
import { FieldOption } from "../utils/getOptions";

const optionsPriority = [
    { value: PriorityOfIssue.low, label: "Низкий" },
    { value: PriorityOfIssue.normal, label: "Нормальный" },
    { value: PriorityOfIssue.high, label: "Высокий" },
    { value: PriorityOfIssue.urgent, label: "Срочный" },
    { value: PriorityOfIssue.immediately, label: "Немедленный" }
];

const IssuePriority: FC = () => {
    const [selectedPriority, setSelectedPriority] = useState<FieldOption<PriorityOfIssue> | null>({
        value: PriorityOfIssue.normal,
        label: "Нормальный"
    });

    const handleChangePriority = (options: FieldOption<PriorityOfIssue> | null) => {
        setSelectedPriority(options);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIssuePriority(selectedPriority));
    }, [selectedPriority]);

    return (
        <InputGroup>
            <InputGroup.Text>Приоритет задачи</InputGroup.Text>
            <Select
                className="w-100"
                aria-label="priority"
                defaultValue={optionsPriority[1]}
                options={optionsPriority}
                id="selectedPriority"
                placeholder="Приоритет задачи"
                onChange={handleChangePriority}
            />
        </InputGroup>
    );
};

export default memo(IssuePriority);
