import { FC, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ComponentsFK } from "../../../../../Redmine/redmineProjects/fk-asp";
import Select from "react-select";
import { setComponentFK } from "../../../../actions/issueAction";
import { FieldOption, getOptions } from "../../../utils/getOptions";

const options = getOptions(ComponentsFK);

const SelectComponentFK: FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<FieldOption<ComponentsFK> | null>(null);

    const dispatch = useDispatch();

    const handleChangeComponent = (options: FieldOption<ComponentsFK> | null) => {
        setSelectedComponent(options);
        dispatch(setComponentFK(options));
    };

    return (
        <InputGroup>
            <InputGroup.Text>Компонент (ФК АСП) *</InputGroup.Text>
            <Select
                className="w-100"
                aria-label="componentFK"
                options={options}
                value={selectedComponent}
                id="componentFK"
                placeholder="Компонент (ФК АСП)"
                onChange={handleChangeComponent}
            />
        </InputGroup>
    );
};

export default SelectComponentFK;
