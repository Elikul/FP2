import axios from "axios";
import {
    base64ToFile,
    fetchIssue,
    fetchMembership,
    fetchProjects,
    fetchResponse,
    fetchTrackersPrj,
    getHeaders, postFile
} from "./utilsRedmine";
import { IUserActionType } from "../indexedDB/indexeddb";
import {
    IInfoProject,
    IMembership,
    InfoToken,
    IssueInfo,
    StatusIssue,
    TrackerType
} from "./redmineTypes";
import { toast } from "react-toastify";

export const REDMINE_URL: string = `https://ntp-redmine.krista.ru/`;
const LIMIT = 100;

enum Fields{
    projects="projects",
    memberships="memberships"
}

export const getRedmineData = async (request:Function,field:string,idProject?:number): Promise<IInfoProject[] | IMembership[]> => {
    let offset = 0;
    let count = 0;
    let data: any = [];
    let redmineData:any = await request(offset, LIMIT, idProject);
    let totalCount = redmineData.total_count;
    while (count < totalCount || offset === 0) {
        redmineData = await request(offset, LIMIT,idProject);
        count += redmineData[field].length;
        data.push(...redmineData[field]);
        offset += LIMIT;
    }
    return data;
}

/**
 * класс RedmineAPI
 */
export class RedmineAPI {
    /**
     * Отправлять запрос на получение проектов (максимум за раз можем получить 100)
     */
    static getProjects = async (): Promise<IInfoProject[]> => {
        return getRedmineData(fetchProjects,Fields.projects)
    };

    /**
     * Отправлять запрос на получение членов проекта (максимум за раз можем получить 100)
     */
    static getMembership = async (idProject: number): Promise<IMembership[]> => {
        return getRedmineData(fetchMembership,Fields.memberships,idProject)
    };

    /**
     * Получить все проекты
     */
    static getAllProjects = (): Promise<IInfoProject[]> => {
        return RedmineAPI.getProjects();
    };

    /**
     * Получить всех членов выбранного проекта
     */
    static getAllMembership = (idProject: number): Promise<IMembership[]> => {
        return RedmineAPI.getMembership(idProject);
    };

    /**
     * Получить все трекеры, используемые в проекте
     * @param idProject - идентификатор выбранного проекта
     */
    static getTrackersPrj = async (idProject: number): Promise<TrackerType[] | undefined> => {
        const data = await fetchTrackersPrj(idProject);
        return data.project.trackers;
    };


    /**
     * Получить токены картинок
     * @param base64imgs - картинка как base64
     */
    static uploadScreenshot = async (base64imgs: string[]): Promise<InfoToken[]> => {
        let tokens: InfoToken[] = [];

        for (const image of base64imgs) {
            let index = base64imgs.indexOf(image);
            const file = await base64ToFile(image);

            const response = postFile(`${REDMINE_URL}/uploads.json?filename=image.png`,file)

            tokens.push({
                token: response.data.upload.token,
                filename: `image${index}.png`,
                content_type: "image/png"
            });
        }

        return tokens;
    };

    /**
     * Получить токены файлов
     * @param fileName - название файла
     * @param file - файл
     * @param extensionFile - расширение файла
     */
    static uploadFile = async (
        fileName: string,
        file: IUserActionType[] | File[] | any,
        extensionFile: string
    ): Promise<InfoToken> => {
        const response = postFile(`${REDMINE_URL}/uploads.json?filename=${fileName}`,file)

        return {
            token: response.data.upload.token,
            filename: fileName,
            content_type: extensionFile
        };
    };

    /**
     * Отправить запрос на создании задачи
     * @param data - информация о создаваемой задаче
     */
    static createIssue = async (data: IssueInfo) => {
        let promises: (InfoToken | Promise<InfoToken>)[] = [
            ...(await RedmineAPI.uploadScreenshot(data.base64imgs)),
            RedmineAPI.uploadFile("log.json", JSON.stringify(data.log), "application/json"),
            ...data.attachments.map(attach => RedmineAPI.uploadFile(attach.file.name, attach.file, attach.file.type))
        ];

        if (data.video) {
            promises.push(RedmineAPI.uploadFile(data.video.name, data.video, "video/webm"));
        }

        if (data.gif) {
            promises.push(RedmineAPI.uploadFile(data.gif.name, data.gif, "image/gif"));
        }

        const uploads = await Promise.all(promises);

        return axios(`${REDMINE_URL}/issues.json`, {
            method: "POST",
            headers: getHeaders("application/json;charset=utf-8"),
            data: JSON.stringify({
                issue: {
                    project_id: data.projectId,
                    subject: data.subject,
                    description: data.description,
                    tracker_id: data.trackerId,
                    priority_id: data.priorityId,
                    status_id: StatusIssue.new,
                    uploads,
                    assigned_to_id: data.assignedTo,
                    custom_fields: data.customFields
                }
            })
        });
    };

    /**
     * Получить лог задачи
     * @param idIssue - идентификатор запрашиваемой задачи
     */
    static getIssueLog = async (idIssue: number): Promise<IUserActionType[] | [] | undefined> => {
        try {
            const response = await fetchIssue(idIssue);
            const logUrl: string | null =
                response.issue.attachments?.find(item => item.filename === "log.json")?.content_url || null;

            if (logUrl) {
                return fetchResponse(logUrl);
            }
        } catch (err) {
            toast.error(`${err}`);
            return;
        }

        return [];
    };
}
