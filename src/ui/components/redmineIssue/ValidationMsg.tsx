import { FC } from "react";
import { alertOptions } from "../../../Redmine/utilsRedmine";
import sendMessageAgentHandler from "../../util/inspectWindow/sendMessageAgentHandler";
import { MessageAgentType } from "../../../agent/utils/MessageAgentTypes";
import {
    removeAllAttachments,
    removeAllScreenshots,
    setLink,
    setRedmineProject,
    showModalCreateIssue
} from "../../actions/issueAction";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { RequiredFieldsASP } from "../../../Redmine/redmineProjects/fk-asp";
import { RequiredFields } from "../../../Redmine/redmineTypes";

/**
 * Заголовки валидационных сообщений
 */
export enum TitleAlert {
    success = "Задача успешна создана",
    erApikey = "Ошибка в поле 'API'",
    erProject = "Ошибка в поле 'Проект'",
    erTopic = "Ошибка в поле 'Тема'",
    erTestingDepartment = "Ошибка в поле 'Отдел тестирования'",
    erDecisionType = "Ошибка в поле 'Тип решения'",
    erComponentFK = "Ошибка в поле 'Компонент (ФК АСП)'",
    err = "Ошибка создания задачи"
}

/**
 * Валидационные сообщения
 */
export enum ValidationMessage {
    okFields = "Задача создана в Redmine. Для просмотра перейдите по ссылке - ",
    erApikey = "Обязательно нужно ввести Ваш ключ доступа к API Redmine.",
    erProject = "Необходимо выбрать проект.",
    erTopic = "Заполните поле 'Тема'.",
    erTestingDepartment = "Заполните поле 'Отдел тестирования'",
    erDecisionType = "Заполните поле 'Тип решения'",
    erComponentFK = "Заполните поле 'Компонент (ФК АСП)'",
    err = "Задача не создалась из-за ошибки API: "
}

/**
 * Какое валидационное уведомление вывести
 */
const handlerValidationMsgs: Record<TitleAlert, Function> = {
    [TitleAlert.erApikey]: () => {
        toast.error(<ValidationMsg title={TitleAlert.erApikey} msg={ValidationMessage.erApikey} />, alertOptions);
        return TitleAlert.erApikey;
    },
    [TitleAlert.erProject]: () => {
        toast.error(<ValidationMsg title={TitleAlert.erProject} msg={ValidationMessage.erProject} />, alertOptions);
        return TitleAlert.erProject;
    },
    [TitleAlert.erTopic]: () => {
        toast.error(<ValidationMsg title={TitleAlert.erTopic} msg={ValidationMessage.erTopic} />, alertOptions);
        return TitleAlert.erTopic;
    },
    [TitleAlert.erTestingDepartment]: () => {
        toast.error(
            <ValidationMsg title={TitleAlert.erTestingDepartment} msg={ValidationMessage.erTestingDepartment} />,
            alertOptions
        );
        return TitleAlert.erTestingDepartment;
    },
    [TitleAlert.erDecisionType]: () => {
        toast.error(
            <ValidationMsg title={TitleAlert.erDecisionType} msg={ValidationMessage.erDecisionType} />,
            alertOptions
        );
        return TitleAlert.erDecisionType;
    },
    [TitleAlert.erComponentFK]: () => {
        toast.error(
            <ValidationMsg title={TitleAlert.erComponentFK} msg={ValidationMessage.erComponentFK} />,
            alertOptions
        );
        return TitleAlert.erComponentFK;
    },
    [TitleAlert.err]: () => {
        return TitleAlert.err;
    },
    [TitleAlert.success]: () => {
        return TitleAlert.success;
    }
};

/**
 * Тип проектов (с добавлением настраиваемых полей или нет)
 */
export enum ProjectType {
    default = "default",
    aspFK = "fk_asp"
}

/**
 * Какие поля проверять у проекта
 */
export const checkFieldsProject: Record<ProjectType, Function> = {
    [ProjectType.default]: (fields: RequiredFields) => {
        if (fields.apikey === null) return handlerValidationMsgs[TitleAlert.erApikey]();

        if (!fields.project) return handlerValidationMsgs[TitleAlert.erProject]();

        if (!fields.topic) return handlerValidationMsgs[TitleAlert.erTopic]();

        return handlerValidationMsgs[TitleAlert.success]();
    },
    [ProjectType.aspFK]: (fields: RequiredFieldsASP) => {
        if (fields.apikey === null) return handlerValidationMsgs[TitleAlert.erApikey]();

        if (!fields.project) return handlerValidationMsgs[TitleAlert.erProject]();

        if (!fields.topic) return handlerValidationMsgs[TitleAlert.erTopic]();

        if (!fields.testDepartment) return handlerValidationMsgs[TitleAlert.erTestingDepartment]();

        if (!fields.decisionType) return handlerValidationMsgs[TitleAlert.erDecisionType]();

        if (!fields.componentFK) return handlerValidationMsgs[TitleAlert.erComponentFK]();

        return handlerValidationMsgs[TitleAlert.success]();
    }
};

/**
 * Тип валидационного уведомления
 */
interface IAlert {
    title: TitleAlert;
    msg: ValidationMessage | string;
}

/**
 * Формирования валидационного уыедомления
 * @param props - интерфейс IAlert - тип валидационного уведомления
 * @constructor
 */
const ValidationMsg: FC<IAlert> = props => {
    const dispatch = useDispatch();
    const issueLink = useSelector<StoreType, string>(({ IssueState }) => IssueState.link);

    const followLink = () => {
        sendMessageAgentHandler({
            type: MessageAgentType.followLink,
            payload: issueLink
        });
        confirmForm(TitleAlert.success);
    };

    const confirmForm = (typeAlert: TitleAlert) => {
        if (typeAlert !== TitleAlert.success) return;

        dispatch(showModalCreateIssue(false));
        dispatch(setRedmineProject(null));
        dispatch(setLink(""));
        dispatch(removeAllAttachments());
        dispatch(removeAllScreenshots());
    };

    return (
        <div className="d-flex flex-column w-100 h-100">
            <div>
                <h4 className="font-weight-bolder text-center">{props.title}</h4>
                <p className="text-center">{props.msg}</p>
                <Button variant="link" onClick={followLink} disabled={issueLink === ""}>
                    {issueLink}
                </Button>
            </div>
            <Button
                className="btn-light align-self-center"
                onClick={() => {
                    confirmForm(props.title);
                }}
            >
                OK
            </Button>
        </div>
    );
};

export default ValidationMsg;
