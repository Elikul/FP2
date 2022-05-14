import { CustomField } from "./redmineProjects/fk-asp";
import { IUserActionType } from "../indexedDB/indexeddb";
import { AttachFilesType } from "../ui/components/redmineIssue/AttachFiles";

/**
 * Общее в ответе Redmine запросов
 */
interface IRedmineResponse {
    limit: number;
    offset: number;
    total_count: number;
}

/**
 * Ответ на запрос проектов в Redmine
 */
export interface IProjectResponse extends IRedmineResponse {
    projects: IInfoProject[];
}

/**
 * Ответ на запрос одного проекта в Redmine
 */
export interface OneProjectResponse {
    project: IInfoProject;
}

/**
 * Ответ на запрос задач в Redmine
 */
export interface IIssueResponse extends IRedmineResponse {
    issues: IIssue[];
}

/**
 * Ответ на запрос одной задачи в Redmine
 */
export interface OneIssueResponse {
    issue: IIssue;
}

/**
 * Ответ на запрос членства в проекте Redmine
 */
export interface IMembershipResponse extends IRedmineResponse {
    memberships: IMembership[];
}

/**
 * Информация о проекте
 */
export interface IInfoProject {
    created_on?: string;
    custom_fields?: Array<Object>;
    description?: string;
    id: number;
    identifier: string;
    is_public: boolean;
    name: string;
    status?: number;
    updated_on?: string;
    parent?: {
        id: number;
        name: string;
    };
    children?: IInfoProject[];
    trackers?: TrackerType[];
}

/**
 * Информация о задаче
 */
export interface IIssue {
    issue_id: number;
    project_id: number;
    subproject_id: number;
    tracker_id: TrackerIssue;
    status_id: StatusIssue;
    priority_id: PriorityOfIssue;
    subject: string;
    description: string;
    category_id?: number;
    is_private?: boolean;
    assigned_to_id?: number; //на кого подписать задачу
    custom_fields?: CustomField[];
    author: {
        id: number;
        name: string;
    };
    attachments?: AttachmentsInfo[];
}

/**
 * Информация о прикреплённых файлов к задаче
 */
export interface AttachmentsInfo {
    id: number;
    filename: string;
    filesize: number;
    content_type: string;
    description: string;
    content_url: string;
    author: {
        id: number;
        name: string;
    };
    created_on: string;
}

/**
 * Информация о члене проекта
 */
export interface IMembership {
    id: number;
    project: { id: number; name: string };
    roles: { id: number; name: string; inherited: boolean }[];
    user: { id: number; name: string };
}

/**
 * Возможные варианты трекеров задачи
 */

// (в каждом проекте не все)
export enum TrackerIssue {
    error = 1,
    change = 2,
    support = 3,
    improvement = 4,
    meeting = 6,
    etc = 7,
    requirement = 8,
    offer = 9,
    projection = 10,
    testing = 11,
    staging = 12,
    documentation = 13,
    news = 18,
    developmentSGM = 21,
    testingSGM = 22,
    stagingSGM = 23,
    documentationSGM = 24,
    researchSGM = 25,
    etcSGM = 26,
    revisionSGM = 27,
    supportSGM = 28,
    booking = 29,
    checkPoint = 30,
    event = 31
}

/**
 * Информация о трекерах
 */
export interface TrackerType {
    id: TrackerIssue;
    name: string;
}

/**
 * Возможные варианты приоритетов задачи
 */
export enum PriorityOfIssue {
    low = 3,
    normal = 4,
    high = 5,
    urgent = 6,
    immediately = 7
}

/**
 * Возможные варианты статусов задачи
 */
export enum StatusIssue {
    new = 1,
    inWork = 2,
    resolved = 3,
    feedback = 4,
    closed = 5,
    postponed = 7
}

/**
 * Информация о токене
 */
export interface InfoToken {
    token: string;
    filename: string;
    content_type: string;
}

/**
 * Информация о задачи
 */
export interface IssueInfo {
    projectId: number; //id проекта
    subject: string; //тема задачи
    assignedTo: number | undefined; //id члена выбранного проекта, которому будет назначена задача
    base64imgs: string[]; //прикрепляемые скриншоты в формате base64
    trackerId: TrackerIssue | undefined; //трекер задачи
    priorityId: PriorityOfIssue | undefined; //приоритет задачи
    log: IUserActionType[]; //прикрепляемый лог
    attachments: AttachFilesType[]; //дополнительные файлы, которые нужно прикрепить к задаче
    description?: string; //описание задачи
    video?: File | null; //прикрепляемое видео
    gif?: File | null; //прикрепляемое гиф
    customFields?: CustomField[]; //настраиваемые поля
}

/**
 * Типы обязательных полей в задачах Redmine
 */
export interface RequiredFields {
    apikey: string;
    project: number;
    topic: string;
}
