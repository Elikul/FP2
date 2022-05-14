import { FC, useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { setIssueTracker } from "../../actions/issueAction";
import { IOption } from "../../../Redmine/utilsRedmine";
import { TrackerIssue } from "../../../Redmine/redmineTypes";
import { RedmineAPI } from "../../../Redmine/RedmineAPI";

interface ISelectTrackerProps {
    idProject: number | undefined;
}

const IssueTracker: FC<ISelectTrackerProps> = ({ idProject }) => {
    const [data, setData] = useState<IOption[]>([]);
    const [selectedTracker, setSelectedTracker] = useState<IOption | null>({
        value: TrackerIssue.error,
        label: "Ошибка"
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (!idProject) return;

        RedmineAPI.getTrackersPrj(idProject).then(newData => {
            let trackers = newData?.map(item => ({ value: item.id, label: item.name })) || [];
            setData(trackers);
        });
    }, [idProject]);

    useEffect(() => {
        dispatch(setIssueTracker(selectedTracker));
    }, [selectedTracker]);

    const handleChangeTracker = (options: IOption | null) => {
        setSelectedTracker(options);
    };

    return (
        <InputGroup>
            <InputGroup.Text>Трекер задачи</InputGroup.Text>
            <Select
                className="w-100"
                aria-label="tracker"
                defaultValue={selectedTracker}
                options={data}
                id="selectedPriority"
                placeholder="Трекер задачи"
                onChange={handleChangeTracker}
            />
        </InputGroup>
    );
};

export default IssueTracker;
