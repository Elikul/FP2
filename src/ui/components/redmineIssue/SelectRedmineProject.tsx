import { FC, useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import { groupProjects, addProjectsChildren, IOption, alertOptions } from "../../../Redmine/utilsRedmine";
import { useDispatch, useSelector } from "react-redux";
import { RedmineAPI } from "../../../Redmine/RedmineAPI";
import { setRedmineProject } from "../../actions/issueAction";
import { StoreType } from "../../reducers";
import { toast } from "react-toastify";
import { IInfoProject } from "../../../Redmine/redmineTypes";

const SelectRedmineProject: FC = () => {
    const [data, setData] = useState<IOption[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<IOption | null>(null);

    const API_KEY: string | null = useSelector<StoreType, string | null>(({ IssueState }) => IssueState.apikey);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!API_KEY) return;

        setLoading(true);
        RedmineAPI.getAllProjects().then((newData: IInfoProject[]) => {
            setData([...groupProjects(addProjectsChildren(newData))]);
            setLoading(false);
        });
    }, [API_KEY]);

    const searchOptions = (inputValue: string) => {
        return data.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));
    };

    const loadOptions = (inputValue: string, callback: (arg0: IOption[]) => void) => {
        callback(searchOptions(inputValue));
    };

    const handleChangeProject = (options: IOption | null) => {
        setSelectedProject(options);
        dispatch(setRedmineProject(options));
    };

    const warnApi = () => {
        if (API_KEY === null) {
            toast.warn("Чтобы выбрать проект, необходимо ввести Ваш ключ доступа к API Redmine.", alertOptions);
        }
    };

    return (
        <InputGroup>
            <InputGroup.Text>Проекты *</InputGroup.Text>
            <AsyncSelect
                className="w-100"
                aria-label="project"
                id="selectedProject"
                isLoading={isLoading}
                defaultOptions={data}
                loadOptions={loadOptions}
                value={selectedProject}
                placeholder="Все проекты"
                onChange={handleChangeProject}
                onFocus={warnApi}
            />
        </InputGroup>
    );
};

export default SelectRedmineProject;
