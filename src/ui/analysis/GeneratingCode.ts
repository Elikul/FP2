import { entityManager } from "./entities/CodeEntityManager/CodeEntityManager";
import { filterGeneratedCode } from "./FilterGeneration";
import { IUserActionType } from "../../indexedDB/indexeddb";

/**Генерация java-кода тестов**/
export default class GeneratingCode {
    //получение сгенерированного кода
    static getGeneratedCode = (generatedCode: string[]): string => generatedCode.join("\n");

    //генерация кода теста
    static toGenerateTestTemplate(records: IUserActionType[]): string[] {
        return filterGeneratedCode(
            records.map((value, index, array) =>
                entityManager.getCode(value, array[index - 1], array[index + 1] || null)
            )
        );
    }
}
