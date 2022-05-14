const API_KEY: string = "74ed5fe647fd4642ab2b63d3fa026ade9c32a445";

/**
 * Состояние окна задачи
 */
export const myIssueState = {
    apikey: API_KEY,
    screenshots: [],
    showModalCreateIssue: false,
    issueLog: [],
    issueTracker: null,
    issuePriority: null,
    selectedProject: null,
    selectedMember: null,
    attachments: [],
    stateOpenScreenshot: false,
    stateOpenLog: false,
    video: null,
    gif: null,
    stateWithVideo: false,
    stateWithGif: false,
    stateWithScreenshots: false,
    disableCreateIssue: false,
    link: "",
    isLoadScreenshot: false,
    testingDepartment: null,
    decisionType: null,
    componentFK: null,
    byCentralOffice: false
};

/**
 * Искусственно созданные проекты для тестирования
 */
export const testProjects = [
    {
        created_on: "2018-06-25T11:09:53Z",
        custom_fields: [{ id: 7, name: "region", value: "" }],
        description: "",
        id: 199,
        identifier: "common_ep_rcs",
        is_public: true,
        name: "Oбщее развитие РКС на НТП по электронным способам закупки",
        status: 5,
        updated_on: "2019-03-06T05:41:04Z",
        trackers: [
            {
                id: 1,
                name: "Ошибка"
            },
            { id: 2, name: "Изменения" }
        ]
    },
    {
        created_on: "2019-08-16T10:41:10Z",
        custom_fields: [{ id: 7, name: "region", value: "" }],
        description: "Проект по автотестированию UI",
        id: 273,
        identifier: "autotest-lib",
        is_public: true,
        name: "autotest-lib",
        status: 1,
        updated_on: "2019-08-16T10:42:23Z"
    },
    {
        created_on: "2021-10-18T07:24:51Z",
        custom_fields: [{ id: 7, name: "region", value: "" }],
        description: "Для тестирования фитч redmine",
        id: 441,
        identifier: "redmine-test",
        is_public: true,
        name: "Тест",
        status: 1,
        updated_on: "2021-10-18T07:31:37Z"
    },
    {
        created_on: "2021-10-18T07:27:50Z",
        custom_fields: [{ id: 7, name: "region", value: "" }],
        description: "Тестирование программного интерфейса (API)",
        id: 442,
        identifier: "redmine-rest-api",
        is_public: true,
        name: "Redmine REST API",
        status: 1,
        updated_on: "2021-10-18T07:45:28Z"
    }
];

/**
 * Искусственно созданные члены проекта для тестирования
 */
export const testMembers = [
    {
        id: 145,
        project: { id: 100, name: "Инфраструктура" },
        roles: { id: 23, name: "Менеджер", inherited: false },
        user: { id: 256, name: "Васечкин Василий" }
    },
    {
        id: 146,
        project: { id: 2, name: "Платформа" },
        roles: { id: 54, name: "Разработчик", inherited: false },
        user: { id: 321, name: "Петров Михаил" }
    }
];
