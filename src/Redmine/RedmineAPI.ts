import {
    base64ToFile,
    fetchIssue,
    fetchMembership,
    fetchProjects,
    fetchResponse,
    fetchTrackersPrj,
    getHeaders, uploadOneFile
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
import {AttachFilesType} from "../ui/components/redmineIssue/AttachFiles";

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
     * Получить все проекты
     */
    static getAllProjects = (): Promise<IInfoProject[]> => {
        return getRedmineData(fetchProjects,Fields.projects)
    };

    /**
     * Получить всех членов выбранного проекта
     */
    static getAllMembership = (idProject: number): Promise<IMembership[]> => {
        return getRedmineData(fetchMembership,Fields.memberships,idProject)
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
    static uploadScreenshots = async(base64imgs: string[]): Promise<InfoToken[]> => {
        let tokens: InfoToken[] = [];
        for (const image of base64imgs) {
            let index = base64imgs.indexOf(image);
            const file = await base64ToFile(image);
            uploadOneFile(`image${index}.png`,file,"image/png")
        }

        return tokens;
    };


    /**
     * Получить токены прикрепляемых файлов
     * @param attachments - прикрепляемы файлы
     */
    static uploadAttachments =  (
        attachments:AttachFilesType[]
    ): InfoToken[] => {
        return attachments.map(attach => uploadOneFile(attach.file.name, attach.file, attach.file.type))
    };

    /**
     * Отправить запрос на создании задачи
     * @param data - информация о создаваемой задаче
     */
    static createIssue = async (data: IssueInfo) => {
        let promises: (InfoToken | InfoToken[])[] = [
            ...(await RedmineAPI.uploadScreenshots(data.base64imgs)),
            uploadOneFile("log.json", JSON.stringify(data.log), "application/json"),
            ...RedmineAPI.uploadAttachments(data.attachments)
        ];

        if (data.video) {
            promises.push(uploadOneFile(data.video.name, data.video, "video/webm"));
        }

        if (data.gif) {
            promises.push(uploadOneFile(data.gif.name, data.gif, "image/gif"));
        }

        const uploads = await Promise.all(promises);

        return fetch(`${REDMINE_URL}/issues.json`, {
            method: "POST",
            headers: getHeaders("application/json;charset=utf-8"),
            body: JSON.stringify({
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
