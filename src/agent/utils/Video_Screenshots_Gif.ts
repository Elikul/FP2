import { InfoScreenshot } from "../../indexedDB/indexeddb";
import sendMessageAgent from "./sendMessageAgent";
import { MessageAgentHandlerType } from "../../ui/util/inspectWindow/MessageHandlerTypes";
import { GifRecorder } from "recordrtc";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const video = document.createElement("video");

type stopRecodeType = (this: MediaRecorder, ev: Event) => any;

/**
 * MediaRecorder для записи видео/гиф и создания скриншотов
 */
export class MediaRecorderApi {
    protected static recorder: MediaRecorder;
    public static chunks: BlobPart[] = [];

    protected static streamGif: MediaStream | null = null;
    protected static recorderGif: any;

    /**
     * Конфигурация параметров видео перед записью
     * @param videoElem - элемент с видео
     */
    static configVideo = (videoElem: HTMLVideoElement) => {
        videoElem.autoplay = true;
        videoElem.style.position = "absolute";
        videoElem.style.zIndex = "9999";
        videoElem.style.top = "0px";
        videoElem.style.left = "0px";
        videoElem.style.opacity = "0";
        videoElem.width = document.body.clientWidth;
        videoElem.height = document.body.clientHeight;

        videoElem.addEventListener(
            "loadedmetadata",
            function() {
                canvas.width = document.body.clientWidth;
                canvas.height = document.body.clientHeight;
            },
            false
        );
    };

    /**
     * Начать запись видео
     */
    static startVideo = async () => {
        const displayMediaOptions = {
            video: {
                cursor: "always"
            },
            audio: false
        };
        this.chunks = [];

        try {
            video.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            this.configVideo(video);
            this.recorder = new MediaRecorder(<MediaStream>video.srcObject);
            this.recorder.ondataavailable = (e: BlobEvent) => this.chunks.push(e.data);
            this.recorder.start();
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Получить записанное видео
     */
    static defaultCallback = (): File => {
        const blob = new Blob(this.chunks, { type: "video/webm" });
        const tracks = (<MediaStream>video.srcObject).getVideoTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        return new File([blob], `video.webm`, {
            type: blob.type
        });
    };

    /**
     * Отправить записанное видео в Devtools
     */
    static devtoolsCallback = () => {
        const file: File = this.defaultCallback();
        sendFile(file);
    };

    /**
     * Остановит запись видео
     * @param callback - событие на остановку видео
     */
    static stopVideo = (callback?: stopRecodeType) => {
        this.recorder.onstop = callback ? callback : this.devtoolsCallback;
        this.recorder.stop();
    };

    /**
     * Получить состояние видео
     * начато/на паузу/записывается
     */
    static getVideoState = (): string => {
        if (this.recorder) return this.recorder.state;
        return "start";
    };

    /**
     * Поставить видео на паузу
     */
    static pauseVideo = () => {
        this.recorder.pause();
    };

    /**
     * Продолжить видео после паузы
     */
    static continueVideo = () => {
        this.recorder.resume();
    };

    /**
     * Сделать скриншот поверх записи
     */
    static screenUp = (): InfoScreenshot => {
        context?.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
        context?.drawImage(video, 0, 0, document.body.clientWidth, document.body.clientHeight);

        const frame = canvas.toDataURL("image/png", 1.0);

        return {
            date: Date.now(),
            screenshot: frame
        };
    };

    /**
     * Начать запись гифки
     */
    static startGif = async () => {
        try {
            this.streamGif = await navigator.mediaDevices.getDisplayMedia({ video: true });
            this.configVideo(video);
            video.srcObject = this.streamGif;

            this.recorderGif = new GifRecorder(this.streamGif, {
                width: 1024,
                height: 576,
                frameRate: 150,
                quality: 20
            });

            this.recorderGif.record();
        } catch (err) {
            console.log(err);
        }
    };

    /**
     * Остановить запись гифки и отправить в Devtools записанное гиф
     */
    static stopGif = () => {
        this.recorderGif.stop((blobGif: Blob) => {
            let gif = new File([blobGif], `gif.gif`, {
                type: blobGif.type
            });

            sendFile(gif);
        });
        this.recorderGif = null;
        const tracks = (<MediaStream>video.srcObject).getVideoTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
    };
}

/**
 * Отправить файл с видео/гиф в Devtools
 * @param file - файл,который хотим отправить в Devtools
 */
export const sendFile = (file: File) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = ev => {
        const payload = ev.target?.result as string;
        sendMessageAgent({ type: MessageAgentHandlerType.setRecordUrl, payload });
    };
};
