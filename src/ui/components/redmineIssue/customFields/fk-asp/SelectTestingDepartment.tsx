import { FC, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TestingDepartments } from "../../../../../Redmine/redmineProjects/fk-asp";
import Select from "react-select";
import { setTestingDepartment } from "../../../../actions/issueAction";
import { FieldOption, getOptions } from "../../../utils/getOptions";

const options = getOptions(TestingDepartments);

const SelectTestingDepartment: FC = () => {
    const [selectedDepartment, setSelectedDepartment] = useState<FieldOption<TestingDepartments> | null>(null);

    const dispatch = useDispatch();

    const handleChangeDepartment = (options: FieldOption<TestingDepartments> | null) => {
        setSelectedDepartment(options);
        dispatch(setTestingDepartment(options));
    };

    return (
        <InputGroup>
            <InputGroup.Text>Отдел тестирования *</InputGroup.Text>
            <Select
                className="w-100"
                aria-label="testingDepartment"
                options={options}
                value={selectedDepartment}
                id="testingDepartment"
                placeholder="Отдел тестирования"
                onChange={handleChangeDepartment}
            />
        </InputGroup>
    );
};

export default SelectTestingDepartment;
