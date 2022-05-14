import { IProjectResponse, RequiredFields } from "../redmineTypes";
import { fetchChildrenProjects } from "../utilsRedmine";

/**
 * Идентификатор проекта АСП ФК
 */
const PROJECT_ID_FK_ASP = 292;

/**
 * Тип настраиваемого поля
 */
export interface CustomField {
    id: number;
    name: string;
    value: string;
}

/**
 * Идентификаторы настраиваемых полей, используемые в проекте АСП ФК и его наследники
 */
enum IdCustomFields {
    testingDepartment = 28,
    decisionType = 83,
    componentFK = 85,
    centralOffice = 86
}

/**
 * Имена настраиваемых полей, используемые в проекте АСП ФК и его наследники
 */
enum NamesCustomFields {
    testingDepartment = "Отдел тестирования",
    decisionType = "Тип решения",
    componentFK = "Компонент (ФК АСП)",
    centralOffice = "ЦА"
}

/**
 * Принимаемые значения поля "Отдел тестирования"
 */
export enum TestingDepartments {
    ottik = "ОТиКК",
    support = "Сопровождение",
    development = "Разработка",
    methodology = "Методология",
    test = "Тестирование"
}

/**
 * Принимаемые значения поля "Тип решения"
 */
export enum DecisionTypes {
    default = "Не указан",
    consultation = "Консультация",
    settingPrivilege = "Настройка прав",
    settingSchemeBusiness = "Настройка схемы бизнес-процесса",
    settingLogContr = "Настройка логического контроля",
    editingDictionary = "Редактирование справочников",
    reworkInputUI = "Доработка интерфейса ввода",
    reworkPrintForm = "Доработка печатной формы",
    reworkOPZ = "Доработка с уточнением ОПЗ",
    changeDoc = "Внесение изменений в документацию"
}

/**
 * Принимаемые значения поля "Компонент (ФК АСП) "
 */
export enum ComponentsFK {
    administrationC = "С/Администрирование",
    directoryC = "С/Справочники",
    hrC = "С/Подразделения-сотрудники-кадровые",
    auditorCalendarC = "С/Календарь-ревизора",
    printFormC = "С/Печатные-формы",
    analyticFormC = "С/Аналитические-формы",
    analysisLoadP = "П/Анализ-нагрузки",
    analysisRiskP = "П/Анализ-рисков",
    requestP = "П/Запросы",
    requestOrdersP = "П/Обращения-поручения",
    proposalToPlanP = "П/Предложения-в-план",
    plansP = "П/Планы",
    participationP = "П/Участие-привлечение",
    TSZP = "П/ЦЗ",
    scheduleP = "П/План-график",
    passportKMI = "И/Паспорт-КМ",
    passportAPI = "И/Паспорт-АП",
    passportOKI = "И/Паспорт-ОК",
    regulatedO = "О/Регламентированная",
    monitoringO = "О/Мониторинговая",
    noRegulatedO = "О/Нерегламентированная",
    inParametersO = "О/По-параметрам",
    constructorO = "О/Конструктор",
    auditorsReestrA = "А/Реестр-аудиторов",
    analysisRskA = "А/Анализ-рисков",
    inNCI = "ИН/НСИ",
    inCBP = "ИН/СВР",
    inEGRL = "ИН/ЕГРЮЛ-ЕГРИП",
    inGIS = "ИН/ГИС-ЕСГФК",
    inEIC = "ИН/ЕИС",
    inPIAO = "ИН/ПИАО",
    inPYOT = "ИН/ПУОТ",
    inCKIAO = "ИН/СКИАО",
    inLanoks = "ИН/ЛАНДОКС",
    etc = "Другое"
}

/**
 * Обязательные поля в задачах АСП ФК и его наследников
 */
export interface RequiredFieldsASP extends RequiredFields {
    testDepartment: TestingDepartments;
    decisionType: DecisionTypes;
    componentFK: ComponentsFK;
}

/**
 * Проверить, является проект АСП ФК или его наследником
 * @param curIdProject - идентификатор текущего проекта
 */
export const isASP = async (curIdProject: number | undefined): Promise<boolean> => {
    const childrenProjects: IProjectResponse = await fetchChildrenProjects(PROJECT_ID_FK_ASP);
    const idsMatch = childrenProjects.projects?.filter(project => project.id === curIdProject);
    if (idsMatch.length !== 0) {
        return true;
    }
    return curIdProject === PROJECT_ID_FK_ASP;
};

/**
 * Сформировать массив настраиваемых полей для проекта АСП ФК или его наследников
 * @param testingDepartment - значение поля 'Отдел тестирования'
 * @param decisionType - значение поля 'Тип решения'
 * @param componentFK - значение поля 'Компонент ФК'
 * @param isByCentralOffice - значение поля 'ЦА'
 */
export const formASPCustomFields = (
    testingDepartment: TestingDepartments | undefined,
    decisionType: DecisionTypes | undefined,
    componentFK: ComponentsFK | undefined,
    isByCentralOffice: boolean
): CustomField[] => {
    return [
        {
            id: IdCustomFields.testingDepartment,
            name: NamesCustomFields.testingDepartment,
            value: testingDepartment || ""
        },
        {
            id: IdCustomFields.decisionType,
            name: NamesCustomFields.decisionType,
            value: decisionType || ""
        },
        {
            id: IdCustomFields.componentFK,
            name: NamesCustomFields.componentFK,
            value: componentFK || ""
        },
        {
            id: IdCustomFields.centralOffice,
            name: NamesCustomFields.centralOffice,
            value: isByCentralOffice ? "1" : "0"
        }
    ];
};
