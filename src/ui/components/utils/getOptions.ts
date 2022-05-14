import { TestingDepartments, DecisionTypes, ComponentsFK } from "../../../Redmine/redmineProjects/fk-asp";

/**
 * Тип выбора опций
 */
export interface FieldOption<T> {
    value: T;
    label: string;
}

/**
 * Получить всевозможные опции для полей с выбором
 * @param objects - тип поля
 */
export const getOptions = (
    objects: typeof TestingDepartments | typeof DecisionTypes | typeof ComponentsFK
): FieldOption<TestingDepartments | DecisionTypes | ComponentsFK>[] => {
    return Object.values(objects).map(item => ({ value: item, label: item }));
};
