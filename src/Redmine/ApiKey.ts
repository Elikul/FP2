import { toast } from "react-toastify";
import { alertOptions } from "./utilsRedmine";

//название свойства
export const PROPERTY_API = "ApiKey";

/**
 * Получить ключ доступа к api redmine из локального хранилища
 */
export const getApi = (): string | null => {
    return localStorage.getItem(PROPERTY_API);
};

/**
 * Добавить ключ доступа к api redmine в локальное хранилище
 */
export const setApi = (value: string) => {
    localStorage.setItem(PROPERTY_API, value);
};

/**
 * Отображать ошибку, если введён некорректный apikey
 */
export const errApi = () => {
    toast.error("Неправильный ключ API (должен быть 40 символов).", alertOptions);
};
