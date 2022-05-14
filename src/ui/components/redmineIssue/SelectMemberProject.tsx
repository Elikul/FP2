import { FC, useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { IOption, alertOptions, groupMembership } from "../../../Redmine/utilsRedmine";
import { useDispatch } from "react-redux";
import { RedmineAPI } from "../../../Redmine/RedmineAPI";
import { toast } from "react-toastify";
import { setMember } from "../../actions/issueAction";
import { IMembership } from "../../../Redmine/redmineTypes";

interface ISelectMemberProps {
    idProject: number | undefined;
}

const SelectMemberProject: FC<ISelectMemberProps> = ({ idProject }) => {
    const [data, setData] = useState<IOption[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [selectedMember, setSelectedMember] = useState<IOption | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!idProject) return;

        setLoading(true);
        RedmineAPI.getAllMembership(idProject).then((newData: IMembership[]) => {
            setData(groupMembership(newData));
            setLoading(false);
        });
    }, [idProject]);

    const searchOptions = (inputValue: string) => {
        return data.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    };

    const loadOptions = (inputValue: string, callback: (arg0: IOption[]) => void) => {
        callback(searchOptions(inputValue));
    };

    const handleChangeMember = (options: IOption | null) => {
        setSelectedMember(options);
        dispatch(setMember(options));
    };

    const warnProject = () => {
        if (!idProject) {
            toast.warn("Чтобы выбрать сотрудника, необходимо выбрать проект.", alertOptions);
        }
    };

    return (
        <InputGroup>
            <InputGroup.Text>Назначить</InputGroup.Text>
            <AsyncSelect
                className="w-100"
                aria-label="member"
                id="selectedMember"
                isLoading={isLoading}
                defaultOptions={data}
                loadOptions={loadOptions}
                value={selectedMember}
                placeholder="Все члены проекта"
                onChange={handleChangeMember}
                onFocus={warnProject}
            />
        </InputGroup>
    );
};

export default SelectMemberProject;
