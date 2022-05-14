import { FC, KeyboardEvent } from "react";
import { FormControl } from "react-bootstrap";
import { errApi, setApi, getApi } from "../../Redmine/ApiKey";
import { toast } from "react-toastify";
import { alertOptions } from "../../Redmine/utilsRedmine";

/**
 * Если в локальном хранилище нет ключа доступа к api redmine, то запросить у пользователя
 */
export const getApikeyRedmine = () => {
    if (getApi() !== null) return;
    toast(<ApikeyRedmine />, {
        ...alertOptions,
        position: "bottom-center",
        autoClose: false,
        closeOnClick: false
    });
};

/**
 * Получить от пользователя  ключа доступа к api redmine
 * @constructor
 */
const ApikeyRedmine: FC = () => {
    const getApikey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        const input = e.target.value;
        if (input.length === 40) {
            setApi(input);
            toast.dismiss();
        } else {
            errApi();
        }
    };

    return <FormControl placeholder="Redmine apikey..." onKeyDown={getApikey} />;
};
