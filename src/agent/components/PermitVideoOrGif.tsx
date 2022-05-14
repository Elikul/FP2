import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { alertOptions } from "../../Redmine/utilsRedmine";
import { MediaRecorderApi } from "../utils/Video_Screenshots_Gif";

export enum PermissionMode {
    video = "video",
    gif = "gif"
}

type Props = {
    mode: PermissionMode;
};

/**
 * Проверка является подключение к странице безопасным
 */
export const isSecureContext = (): boolean => {
    const url = window.location.toString();
    if (!(url.includes("https") || url.includes("localhost"))) {
        toast.warn(
            "Рекомендуем загрузить приложение, используя протокол https, иначе запись экрана во время работы с расширением будет недоступна.",
            alertOptions
        );
        return false;
    }
    return true;
};

/**
 * Получить элемент по id
 * @param id - id элемента
 */
export const nodeById = (id: string) => {
    let div = document.getElementById(id);
    if (div) {
        div.remove();
    }
    div = document.createElement("div");
    div.id = id;
    document.body.appendChild(div);
    return document.getElementById(id);
};

/**
 * Добавить в Html документ страницы контейнер, которому будут прикреплять уведомления / модальные окна
 */
export const addToastContainer = () => {
    ReactDOM.render(<ToastContainer />, nodeById("video_permission"));
};

/**
 * Разрешение на захват экрана части страницы для записи видео/гиф
 * @param mode - режим записи (видео/гиф)
 */
export const permitVideoOrGif = (mode: PermissionMode) => {
    toast.info(<Permission mode={mode} />, { ...alertOptions, autoClose: false });
};

/**
 * Отрисовка модального окна с запросом на разрешение записи видео/гиф
 * @param props - режим записи видео/гиф
 * @constructor
 */
const Permission = (props: Props) => {
    const confirmAlert = async (mode: PermissionMode) => {
        mode === PermissionMode.video ? await MediaRecorderApi.startVideo() : await MediaRecorderApi.startGif();
    };

    return (
        <div className="d-flex flex-column">
            <div>
                <h6 className="fw-bold text-center">Разрешение записи видео / гиф</h6>
                <p className="text-center">Подтвердите разрешение на захват экрана для записи видео / гиф</p>
            </div>
            <Button size="sm" className="btn-info align-self-center" onClick={() => confirmAlert(props.mode)}>
                OK
            </Button>
        </div>
    );
};
