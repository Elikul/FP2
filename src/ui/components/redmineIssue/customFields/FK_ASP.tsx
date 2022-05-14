import React, { FC, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import SelectComponentFK from "./fk-asp/SelectComponentFK";
import SelectDecisionType from "./fk-asp/SelectDecisionType";
import SelectTestingDepartment from "./fk-asp/SelectTestingDepartment";
import { setByCentralOffice } from "../../../actions/issueAction";

const FK_ASP: FC = () => {
    const dispatch = useDispatch();

    const [isChecked, setChecked] = useState<boolean>(false);
    const handlerCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        dispatch(setByCentralOffice(e.target.checked));
    };

    return (
        <div>
            <SelectTestingDepartment />
            <SelectDecisionType />
            <SelectComponentFK />
            <InputGroup>
                <InputGroup.Text>ЦА *</InputGroup.Text>
                <InputGroup.Checkbox checked={isChecked} onChange={handlerCheckbox} />
            </InputGroup>
        </div>
    );
};

export default FK_ASP;
