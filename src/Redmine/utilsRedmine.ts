import { ToastOptions } from "react-toastify";
import {
    IInfoProject,
    IMembership,
    IMembershipResponse,
    IProjectResponse,
    OneIssueResponse,
    OneProjectResponse
} from "./redmineTypes";
import { REDMINE_URL } from "./RedmineAPI";

/**
 * Опции установленные по умолчанию для toast
 */
export const alertOptions: ToastOptions = {
    position: "top-center",
    autoClose: 7000,
    closeButton: true,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
};

/**
 * Получить ответ на запрос
 * @param requestInfo - запрос
 */
export const fetchResponse = (requestInfo: string): Promise<any> => {
    return fetch(requestInfo, {
        headers: getHeaders()
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    });
};

/**
 * Запрос проектов
 * @param offset - смещение
 * @param limit - лимит проектов, которые можем получить за один запрос
 */
export const fetchProjects = async (offset: number, limit: number): Promise<IProjectResponse> => {
    return fetchResponse(`${REDMINE_URL}projects.json?offset=${offset}&limit=${limit}`);
};

/**
 * Запрос членства в проекте
 * @param idProject - идентификатор проекта
 * @param offset - смещение
 * @param limit - лимит членов, которые можем получить за один запрос
 */
export const fetchMembership = async (
    idProject: number,
    offset: number,
    limit: number
): Promise<IMembershipResponse> => {
    return fetchResponse(`${REDMINE_URL}projects/${idProject}/memberships.json?offset=${offset}&limit=${limit}`);
};

/**
 * Получить заголовки запроса
 * @param contentType - тип передаваемого контента
 */
export const getHeaders = (contentType = "application/octet-stream"): Record<string, string> => {
    return {
        "X-Redmine-API-Key": localStorage.getItem("ApiKey") as string,
        "Content-Type": contentType
    };
};

/**
 * Получить картинку как файл
 * @param base64img - картинка в base64
 */
export const base64ToFile = async (base64img: string): Promise<File> => {
    const response = await fetch(base64img);
    const blob = await response.blob();

    return new File([blob], "image", { type: "image/png" });
};

/**
 * Для отображения проектов в select
 */
export interface IOption {
    value: number;
    label: string;
}

/**
 * Добавить проекты его детей
 * @param projectList - все проекты
 */
export const addProjectsChildren = (projectList: IInfoProject[]): IInfoProject[] => {
    //КПЗ
    const copyProjectList = [...projectList];
    const addChildren = (project: IInfoProject): IInfoProject => ({
        ...project,
        children: copyProjectList.filter(sub => sub.parent && project.id === sub.parent.id).map(addChildren)
    });

    return copyProjectList.map(addChildren).filter(project => !project.parent); //убираем повторения проектов
};

/**
 * Получить группу
 * @param project - проект
 * @param level - уровень проекта
 */
const getGroup = (project: IInfoProject, level: number): IOption[] => {
    return [
        {
            value: project.id,
            label: new Array(level * 2).fill("-").join("") + " " + project.name
        },
        ...groupProjects(project?.children || [], level + 1)
    ];
};

/**
 * Сгруппировать проекты
 * @param data - все проекты
 * @param level - уровень проекта
 */
export const groupProjects = (data: IInfoProject[], level = 0): IOption[] => {
    //КПЗ
    const copyData = [...data];
    return copyData.reduce((arr: IOption[], el: IInfoProject) => {
        return [...arr, ...getGroup(el, level)];
    }, []);
};

/**
 * Сгруппировать членов проекта
 * @param data - все члена проекта
 */
export const groupMembership = (data: IMembership[]): IOption[] => {
    return data
        .filter(member => member?.user)
        .map(member => ({ value: member.user?.id, label: member.user?.name }))
        .sort((a, b) => (a.label > b.label ? 1 : -1));
};

/**
 * Запрос проектов наследников
 * @param idProject - идентификатор проекта
 */
export const fetchChildrenProjects = async (idProject: number): Promise<IProjectResponse> => {
    return fetchResponse(`${REDMINE_URL}projects.json?parent_id=${idProject}`);
};

/**
 * Запрос трекеров, используемых в проекте
 * @param idProject - идентификатор проекта
 */
export const fetchTrackersPrj = async (idProject: number): Promise<OneProjectResponse> => {
    return fetchResponse(`${REDMINE_URL}projects/${idProject}.json?include=trackers`);
};

/**
 * Запрос задачи с её прикреплёнными файлами
 * @param idIssue - идентификатор запрашиваемой задачи
 */
export const fetchIssue = async (idIssue: number): Promise<OneIssueResponse> => {
    return fetchResponse(`${REDMINE_URL}issues/${idIssue}.json?include=attachments`);
};

/**
 * Отправить файл
 * @param request - запрос
 * @param file - файл, который хотим загрузить
 */
export const postFile = (request:string,file:File):any => {
    return fetch(request, {
        method: "POST",
        headers: getHeaders(),
        body: file
    }).then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
    })
}