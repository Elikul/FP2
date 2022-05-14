import { FC, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons/faStop";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { isSecureContext, nodeById, PermissionMode, permitVideoOrGif } from "./PermitVideoOrGif";
import { MediaRecorderApi } from "../utils/Video_Screenshots_Gif";
import ReactDOM from "react-dom";
import { MessageAgentType } from "../utils/MessageAgentTypes";
import Agent from "../Agent";
import { formatDateDownload } from "../utils/formatDate";
import VideoList from "./VideoList";
import { toast } from "react-toastify";
import { saveDataInIDB, StoreName } from "../../indexedDB/indexeddb";
import { alertOptions } from "../../Redmine/utilsRedmine";

/**
 * Прикрепить к странице модальное окно для записи видео
 */
export const setRecordWindow = () => {
    ReactDOM.render(<RecordWindowPopup />, nodeById("record_popup"));
};

/**
 * Открыть список 5 последних видео
 */
const openListOfVideos = () => {
    toast(<VideoList />, { ...alertOptions, autoClose: false, closeOnClick: false });
};

/**
 * Отрисовка модального окна для записи видео
 * @constructor
 */
const RecordWindowPopup: FC = () => {
    const [isPauseVideo, setPauseVideo] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("#");
    const [disabled, setDisabled] = useState<boolean>(true);
    const [hint, showHint] = useState<boolean>(false);
    const [isShow, setHint] = useState<boolean>(false);

    //переключаться между режимами видео (старт/записывается/пауза)
    const switcher = async () => {
        const context: boolean = isSecureContext();
        if (!context) return;

        const state = MediaRecorderApi.getVideoState();
        if (state === "paused") {
            MediaRecorderApi.continueVideo();
            setPauseVideo(true);
        } else if (state === "recording") {
            MediaRecorderApi.pauseVideo();
            setPauseVideo(false);
        } else {
            permitVideoOrGif(PermissionMode.video);
            setPauseVideo(true);
            setHint(true);
            showHint(true);
            setDisabled(false);
        }
    };

    //получить видео после остановки записи
    const handlerStop = () => {
        MediaRecorderApi.stopVideo(() => {
            const videoFile = MediaRecorderApi.defaultCallback();
            let reader = new FileReader();
            reader.readAsDataURL(videoFile);
            reader.onload = async ev => {
                const base64 = ev.target?.result as string;
                setUrl(base64);
                await saveDataInIDB(StoreName.video, {
                    date: Date.now(),
                    video: base64
                });
            };
        });
        setPauseVideo(false);
        showHint(false);
        setDisabled(true);
    };

    //убрать окно записи видео
    const closeRecordWindow = () => {
        document.querySelector("#record_popup")?.remove();
        Agent.handleMessage({ source: "inspect-window", name: MessageAgentType.disconnect });
    };

    return (
        <div
            id="recordWindow"
            className="record-window-size d-flex flex-column align-items-center justify-content-center position-absolute start-50 translate-middle opacity-50 bg-white rounded-bottom"
        >
            <Button
                id="closeBtn"
                className="position-absolute top-0 end-0 opacity-25 outline-none act-style"
                variant="white"
                onClick={closeRecordWindow}
            >
                <FontAwesomeIcon icon={faTimes} size="xs" />
            </Button>
            <ButtonGroup>
                <Button
                    id="playVideo"
                    title={isPauseVideo ? "Поставить на паузу" : "Начать/продолжить запись"}
                    className="act-style"
                    variant="secondary"
                    onClick={switcher}
                >
                    <FontAwesomeIcon icon={isPauseVideo ? faPause : faPlay} size="xs" />
                </Button>
                <Button
                    id="stopVideo"
                    title="Закончить запись"
                    className="act-style"
                    variant="secondary"
                    onClick={handlerStop}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faStop} size="xs" />
                </Button>
            </ButtonGroup>

            {isShow && (
                <div className="text-size">
                    {(hint && "Идёт запись видео...") || (
                        <div>
                            <a id="downloadVideo" href={url} download={formatDateDownload(Date.now())}>
                                Скачать видео
                            </a>
                            <Button variant="none" onClick={openListOfVideos}>
                                <FontAwesomeIcon icon={faChevronDown} size="xs" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
