import { FC, useState, useEffect } from "react";
import * as React from "react";
import { alertOptions, IOption } from "../../../Redmine/utilsRedmine";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { InfoScreenshot, IUserActionType } from "../../../indexedDB/indexeddb";
import "viewerjs-react/dist/index.css";
import { RedmineAPI } from "../../../Redmine/RedmineAPI";
import { setApiKey, setLink, withGif, withScreenshots, withVideo } from "../../actions/issueAction";
import AttachScreenshots from "./AttachScreenshots";
import AttachIssueLog from "./AttachIssueLog";
import IssueTracker from "./IssueTracker";
import IssuePriority from "./IssuePriority";
import SelectRedmineProject from "./SelectRedmineProject";
import AttachFiles, { AttachFilesType } from "./AttachFiles";
import ScreenLogBG from "./ScreenLogBG";
import { checkFieldsProject, ProjectType, TitleAlert, ValidationMessage } from "./ValidationMsg";
import { toast } from "react-toastify";
import ValidationMsg from "./ValidationMsg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import SelectMemberProject from "./SelectMemberProject";
import { IssueInfo, PriorityOfIssue, TrackerIssue } from "../../../Redmine/redmineTypes";
import {
    ComponentsFK,
    CustomField,
    DecisionTypes,
    formASPCustomFields,
    isASP,
    TestingDepartments
} from "../../../Redmine/redmineProjects/fk-asp";
import FK_ASP from "./customFields/FK_ASP";
import { FieldOption } from "../utils/getOptions";
import { errApi } from "../../../Redmine/ApiKey";

const FormIssue: FC = () => {
    const dispatch = useDispatch();
    const API_KEY = useSelector<StoreType, string | null>(({ IssueState }) => IssueState.apikey);
    const screenshots = useSelector<StoreType, InfoScreenshot[]>(({ IssueState }) => IssueState.screenshots);
    const issueLog = useSelector<StoreType, IUserActionType[]>(({ IssueState }) => IssueState.issueLog);
    let videoFile: File | null = useSelector<StoreType, File | null>(({ IssueState }) => IssueState.video);
    const isVideo = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateWithVideo);
    let gifFile: File | null = useSelector<StoreType, File | null>(({ IssueState }) => IssueState.gif);
    const isGif = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateWithGif);
    const isScreenshots = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateWithScreenshots);

    const selectedTracker = useSelector<StoreType, FieldOption<TrackerIssue> | null>(
        ({ IssueState }) => IssueState.issueTracker
    );
    const selectedPriority = useSelector<StoreType, FieldOption<PriorityOfIssue> | null>(
        ({ IssueState }) => IssueState.issuePriority
    );

    const selectedProject = useSelector<StoreType, IOption | null>(({ IssueState }) => IssueState.selectedProject);
    const selectedMember = useSelector<StoreType, IOption | null>(({ IssueState }) => IssueState.selectedMember);

    const attachments = useSelector<StoreType, AttachFilesType[]>(({ IssueState }) => IssueState.attachments);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isASPProject, addFields] = useState<boolean>(false);

    const testingDepartment = useSelector<StoreType, FieldOption<TestingDepartments> | null>(
        ({ IssueState }) => IssueState.testingDepartment
    );
    const decisionType = useSelector<StoreType, FieldOption<DecisionTypes> | null>(
        ({ IssueState }) => IssueState.decisionType
    );
    const componentFK = useSelector<StoreType, FieldOption<ComponentsFK> | null>(
        ({ IssueState }) => IssueState.componentFK
    );
    const isByCentralOffice = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.byCentralOffice);

    useEffect(() => {
        if (!selectedProject) return;

        isASP(selectedProject?.value).then(result => {
            addFields(result);
        });
    }, [selectedProject]);

    const handlerProject: Record<ProjectType, Function> = {
        [ProjectType.default]: (topic: HTMLInputElement | null) => {
            return checkFieldsProject[ProjectType.default]({
                apikey: API_KEY,
                project: selectedProject?.value,
                topic: topic?.value
            });
        },
        [ProjectType.aspFK]: (topic: HTMLInputElement | null) => {
            return checkFieldsProject[ProjectType.aspFK]({
                apikey: API_KEY,
                project: selectedProject?.value,
                topic: topic?.value,
                testDepartment: testingDepartment?.value,
                decisionType: decisionType?.value,
                componentFK: componentFK?.value
            });
        }
    };

    const onClickSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const images: string[] = isScreenshots ? screenshots.map(screen => screen.screenshot) : [];
        const topic: HTMLInputElement | null = document.querySelector("#topic");
        const description: HTMLTextAreaElement | null = document.querySelector("#description");
        const video = isVideo ? videoFile : null;
        const gif = isGif ? gifFile : null;
        const isFieldOk = isASPProject
            ? handlerProject[ProjectType.aspFK](topic)
            : handlerProject[ProjectType.default](topic);
        const customFields: CustomField[] = isASPProject
            ? formASPCustomFields(testingDepartment?.value, decisionType?.value, componentFK?.value, isByCentralOffice)
            : [];

        if (isFieldOk !== TitleAlert.success) {
            setLoading(false);
            return;
        }

        if (API_KEY && selectedProject && topic) {
            const issueInfo: IssueInfo = {
                projectId: selectedProject.value,
                subject: topic.value,
                assignedTo: selectedMember?.value,
                base64imgs: images,
                trackerId: selectedTracker?.value,
                priorityId: selectedPriority?.value,
                log: issueLog,
                attachments: attachments,
                description: description?.value,
                video: video,
                gif: gif,
                customFields: customFields
            };

            try {
                let result = await RedmineAPI.createIssue(issueInfo);

                if (result) {
                    setLoading(false);
                    let issueId: string = result.data.issue.id;
                    dispatch(setLink(`https://ntp-redmine.krista.ru/issues/${issueId}`));

                    toast.success(
                        <ValidationMsg title={TitleAlert.success} msg={ValidationMessage.okFields} />,
                        alertOptions
                    );
                }
            } catch (err) {
                setLoading(false);
                toast.error(<ValidationMsg title={TitleAlert.err} msg={ValidationMessage.err + err} />, alertOptions);
                return;
            }
        }
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputApiValue: string = e.target?.value;
        if (inputApiValue.length === 40) {
            dispatch(setApiKey(inputApiValue));
        } else {
            errApi();
        }
    };

    const handlerVideoCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(withVideo(e.target.checked));
    };

    const handlerGifCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(withGif(e.target.checked));
    };

    const handlerScreenshotCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(withScreenshots(e.target.checked));
    };

    return (
        <Form className="d-flex flex-column" onSubmit={onClickSubmit} data-testid="form">
            <InputGroup>
                <InputGroup.Text>ApiKey *</InputGroup.Text>
                <Form.Control
                    id="api"
                    type="text"
                    placeholder="Введите apikey..."
                    aria-label="apikey"
                    onBlur={onBlurHandler}
                    autoComplete="off"
                    defaultValue={API_KEY as string}
                />
            </InputGroup>
            <SelectRedmineProject />
            <InputGroup>
                <InputGroup.Text>Тема *</InputGroup.Text>
                <Form.Control
                    id="topic"
                    type="text"
                    placeholder="Введите тему...."
                    aria-label="topic"
                    autoComplete="off"
                />
            </InputGroup>
            {isASPProject && <FK_ASP />}
            <InputGroup>
                <InputGroup.Text>Описание</InputGroup.Text>
                <FormControl
                    as="textarea"
                    id="description"
                    aria-label="textarea"
                    placeholder="Введите описание..."
                    autoComplete="off"
                />
            </InputGroup>
            <SelectMemberProject idProject={selectedProject?.value} />
            <IssueTracker idProject={selectedProject?.value} />
            <IssuePriority />
            <AttachFiles />
            <Form.Group className="fs-5">
                <InputGroup>
                    <InputGroup.Text>Прикрепить скриншоты к задаче</InputGroup.Text>
                    <InputGroup.Checkbox onChange={handlerScreenshotCheckbox} />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Прикрепить видео к задаче</InputGroup.Text>
                    <InputGroup.Checkbox checked={isVideo} onChange={handlerVideoCheckbox} disabled={!isVideo} />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>Прикрепить гифку к задаче</InputGroup.Text>
                    <InputGroup.Checkbox checked={isGif} onChange={handlerGifCheckbox} disabled={!isGif} />
                </InputGroup>
            </Form.Group>
            <Form.Group className="d-flex flex-column">
                <ScreenLogBG />
                <div className="d-flex flex-row">
                    <AttachScreenshots />
                    <AttachIssueLog />
                </div>
            </Form.Group>
            <Button type="submit" data-testid="btn-submit" className="mt-2 btn-lg align-self-center">
                Создать {isLoading && <FontAwesomeIcon icon={faSpinner} />}
            </Button>
        </Form>
    );
};

export default FormIssue;
