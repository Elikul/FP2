import { waitForTheElement, waitForTheElementToDisappear } from "wait-for-the-element";

/**
 * Ждёт появление элемента на странице
 * @param selector - селектор/группа селекторов
 * @param timeout - время ожидания элемента на странице (секунды)
 */
export const waitElement = (selector: string, timeout: number = 10000): Promise<boolean> => {
    return waitForTheElement(selector, {
        timeout: timeout
    }).then(element => {
        return !!element;
    });
};

/**
 * Ждёт, когда элемент пропадёт на странице
 * @param selector - селектор/группа селекторов
 * @param timeout - время ожидания исчезновения элемента на странице (секунды)
 */
export const waitElementToDisappear = (selector: string, timeout: number = 6000): Promise<boolean> => {
    return waitForTheElementToDisappear(selector, { timeout: timeout }).then(hidden => {
        return hidden;
    });
};
