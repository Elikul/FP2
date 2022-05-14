import { FC, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DecisionTypes } from "../../../../../Redmine/redmineProjects/fk-asp";
import Select from "react-select";
import { setDecisionType } from "../../../../actions/issueAction";
import { FieldOption, getOptions } from "../../../utils/getOptions";

const options = getOptions(DecisionTypes);

const SelectDecisionType: FC = () => {
    const [selectedDecision, setSelectedDecision] = useState<FieldOption<DecisionTypes> | null>(null);

    const dispatch = useDispatch();

    const handleChangeDecision = (options: FieldOption<DecisionTypes> | null) => {
        setSelectedDecision(options);
        dispatch(setDecisionType(options));
    };

    return (
        <InputGroup>
            <InputGroup.Text>Тип решения *</InputGroup.Text>
            <Select
                className="w-100"
                aria-label="decisionType"
                options={options}
                value={selectedDecision}
                id="decisionType"
                placeholder="Тип решения"
                onChange={handleChangeDecision}
            />
        </InputGroup>
    );
};

export default SelectDecisionType;
