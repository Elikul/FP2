import { v4 as uuid_v4 } from "uuid";

//из чего состоит лог пользовательского действия
export interface IUserActionType {
    date: number;
    type: string;
    nameForm?: string;
    dfdNameForm?: string;
    tab?: string;
    tabContainer?: string | null;
    bigButton?: string;
    grid?: string;
    gridToolbar?: string;
    gridCellRow?: string;
    gridCellCol?: string;
    quickFilter?: string;
    isFilter?: boolean;
    filterToolbar?: string;
    filterCaption?: string;
    navigator?: string;
    modalWindow?: string;
    modalWindowButton?: string;
    value?: string;
    xpath?: string;
}

//данные о сессии
export interface ISessionData {
    dateOfStart: number;
    dateOfEnd: number;
    title: string;
    generatedCode: string[];
    log: IUserActionType[];
    screenshots: InfoScreenshot[];
    recordUrl: string;
}

//данные о скриншоте
export interface InfoScreenshot {
    date: number;
    screenshot: string;
}

//данные о видео
export interface VideoInfo {
    date: number;
    video: string;
}

const DB_NAME = "LoggerDB";

export enum StoreName {
    logActions = "logUserAction",
    sessionsData = "sessionsData",
    screenshots = "screenShots",
    video = "videoStore"
}

/**
 * Инициализировать хранилища
 */
export const initIndexedDB = async () => {
    await createObjectStore(StoreName.logActions);
    await createObjectStore(StoreName.screenshots);
    await createObjectStore(StoreName.sessionsData);
};

/**
 * Создать хранилище
 * @param storeName - имя хранилища
 */
export const createObjectStore = async (storeName: StoreName): Promise<IDBDatabase> => {
    const promise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
        let openRequest = indexedDB.open(DB_NAME);

        openRequest.onsuccess = () => {
            console.log("running DB onsuccess");
            let db = openRequest.result;
            if (db.objectStoreNames.contains(storeName)) {
                openRequest.transaction?.objectStore(storeName);
            } else {
                let version = db.version;
                db.close();
                let secondOpenRequest = indexedDB.open(DB_NAME, version + 1);
                secondOpenRequest.onupgradeneeded = () => {
                    let newVersionDB = secondOpenRequest.result;
                    let objectStore: IDBObjectStore | undefined = newVersionDB.createObjectStore(storeName, {
                        autoIncrement: true
                    });

                    objectStore?.createIndex("key", "key");

                    secondOpenRequest.result.close();
                    resolve(secondOpenRequest.result);
                };
            }
        };

        openRequest.onerror = function(event: Event) {
            console.log("Error DB");
            console.dir(event);
            reject();
        };
    });

    return await promise;
};

/**
 * Подключиться к схеме
 */
const getConnection = async (): Promise<IDBDatabase> => {
    const promise: Promise<IDBDatabase> = new Promise((resolve, reject) => {
        let openRequest = indexedDB.open(DB_NAME);

        openRequest.onsuccess = () => {
            console.log("running DB onsuccess");
            resolve(openRequest.result);
        };

        openRequest.onerror = function(event: Event) {
            console.log("Error DB");
            console.dir(event);
            reject();
        };
    });

    return await promise;
};

/**
 * Сохранить данные в IndexedDB
 * @param storeName - имя хранилища
 * @param data - сессионные данные/ пользовательские действия / скриншоты пользовательских действий
 */
export const saveDataInIDB = async (
    storeName: StoreName,
    data: ISessionData | IUserActionType | InfoScreenshot | VideoInfo
) => {
    const db: IDBDatabase = await getConnection();
    const transaction: IDBTransaction = db.transaction([storeName], "readwrite");
    const store: IDBObjectStore = transaction.objectStore(storeName);

    let request: IDBRequest<IDBValidKey> = store.add({ key: uuid_v4(), data });

    request.onsuccess = function() {
        console.log("save request is success");
    };

    request.onerror = function(e: Event) {
        console.log("Error save request", e.target);
    };
};

/**
 * Получить данные хранилища из IndexedDB
 * @param storeName - имя хранилища
 */
export const getsDataFromDB = async (
    storeName: StoreName
): Promise<IUserActionType[] | ISessionData[] | InfoScreenshot[] | VideoInfo[]> => {
    const db: IDBDatabase = await getConnection();
    let transaction: IDBTransaction = db.transaction([storeName], "readonly");
    let store: IDBObjectStore = transaction.objectStore(storeName);
    // Создать запрос курсора
    let req: IDBRequest<IDBCursorWithValue | null> = store.openCursor();

    return new Promise<IUserActionType[] | ISessionData[] | InfoScreenshot[]>((resolve, reject) => {
        let allNotes: IUserActionType[] | ISessionData[] | InfoScreenshot[] = [];
        req.onsuccess = (e: any) => {
            // Результатом req.onsuccess в запросах openCursor является
            // IDBCursor
            let cursor: IDBCursorWithValue = e.target.result;
            if (cursor != null) {
                // Если курсор не нулевой, мы получили элемент.
                allNotes.push(cursor.value.data);
                cursor.continue();
            } else {
                // Если у нас нулевой курсор, это означает, что мы получили все данные
                resolve(allNotes);
            }
        };

        req.onerror = (event: Event) => {
            console.error("error in cursor request " + event.target);
            reject();
        };
    });
};

/**
 * Очистить хранилище
 * @param storeName - имя хранилища
 */
export const clearStore = async (storeName: StoreName) => {
    const db: IDBDatabase = await getConnection();
    let transaction: IDBTransaction = db.transaction([storeName], "readwrite");
    let store: IDBObjectStore = transaction.objectStore(storeName);

    let objectStoreRequest: IDBRequest = store.clear();

    objectStoreRequest.onsuccess = function() {
        console.log("DB clear");
    };

    objectStoreRequest.onerror = function(e: Event) {
        console.log("Error request", e.target);
    };
};

/**
 * Удалить лог пользовательских действий из соответсвующего храилища IndexedDB
 * @param log - лог
 */
export const deleteUserActionByDate = async (log: IUserActionType) => {
    const db: IDBDatabase = await getConnection();
    const transaction: IDBTransaction = db.transaction([StoreName.logActions], "readwrite");
    const store: IDBObjectStore = transaction.objectStore(StoreName.logActions);

    // Создать запрос курсора
    let req: IDBRequest<IDBCursorWithValue | null> = store.openCursor();

    return new Promise<IUserActionType[]>((resolve, reject) => {
        req.onsuccess = (e: any) => {
            // Результатом req.onsuccess в запросах openCursor является
            // IDBCursor
            let cursor: IDBCursorWithValue = e.target.result;
            if (cursor != null) {
                // Если курсор не нулевой
                if (cursor.value.data.date === log.date) {
                    cursor.delete(); //удаляем запись
                    console.log("request DELETE is success");
                }
                cursor.continue();
            }
        };

        req.onerror = (e: Event) => {
            console.error("error in cursor request " + e.target);
            reject();
        };
    });
};
