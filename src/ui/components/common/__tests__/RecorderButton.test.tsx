import { render, fireEvent, cleanup } from "@testing-library/react";
import * as Actions from "../../../util/inspectWindow/sendMessageAgentHandler";
import RecorderButton from "../RecorderButton";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import dayjs from "dayjs";
import { myIssueState } from "../../utils/test_util";

const spy = jest.spyOn(Actions, "default");

describe("Recorder button component", function() {
    afterEach(cleanup);

    it("Должна срабатывать кнопка начатия формирования лога с видео", function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <RecorderButton />)({
                MainState: {
                    connectAgent: true,
                    isLoading: false
                },
                SessionState: {
                    currentSession: 0,
                    sessionData: [],
                    startSessionDate: 0,
                    stopSessionDate: 0
                }
            })
        );

        fireEvent.click(getByTestId("btn-start"));
        expect(spy).toHaveBeenCalledWith({ type: "startVideo" });
        expect(spy).toHaveBeenCalledWith({ type: "clearData" });
    });

    it("Должна срабатывать кнопка начатия формирования лога с гиф", function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <RecorderButton />)({
                MainState: {
                    connectAgent: true,
                    isLoading: false
                },
                SessionState: {
                    currentSession: 0,
                    sessionData: [],
                    startSessionDate: 0,
                    stopSessionDate: 0
                }
            })
        );

        fireEvent.click(getByTestId("dropdown-menu"));
        fireEvent.click(getByTestId("btn-start-gif"));
        expect(spy).toHaveBeenCalledWith({ type: "startGif" });
        expect(spy).toHaveBeenCalledWith({ type: "clearData" });
    });

    it("Должна срабатывать кнопка остановки формирования лога с видео", async function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <RecorderButton />)({
                MainState: {
                    connectAgent: true,
                    isLoading: true
                },
                SessionState: {
                    currentSession: 1,
                    sessionData: [
                        {
                            dateOfStart: 1618215571051,
                            dateOfEnd: 1618215571079,
                            title: dayjs(1618215571079).format("DD-MM-YYYY HH:mm:ss"),
                            log: [],
                            generatedCode: [],
                            screenshots: [],
                            recordUrl: ""
                        },
                        {
                            dateOfStart: 1625656067437,
                            dateOfEnd: 0,
                            title: "Текущая",
                            log: [],
                            generatedCode: [],
                            screenshots: [],
                            recordUrl: ""
                        }
                    ],
                    startSessionDate: 1625656067437,
                    stopSessionDate: 0
                },
                IssueState: { ...myIssueState, stateWithVideo: true }
            })
        );

        fireEvent.click(getByTestId("btn-stop"));
        await new Promise(r => setTimeout(r, 2000));
        expect(spy).toHaveBeenCalledWith({
            payload: {
                dateOfEnd: 0,
                dateOfStart: 1625656067437,
                generatedCode: [],
                log: [],
                screenshots: [],
                title: "Текущая",
                recordUrl: ""
            },
            type: "saveSession"
        });
        expect(spy).toHaveBeenCalledWith({ type: "stopVideo" });
        expect(spy).toHaveBeenCalledWith({
            payload: {
                dateOfEnd: 0,
                dateOfStart: 1625656067437,
                generatedCode: [],
                log: [],
                recordUrl: "",
                screenshots: [],
                title: "Текущая"
            },
            type: "saveSession"
        });
    });

    it("Должна срабатывать кнопка остановки формирования лога с гиф", async function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <RecorderButton />)({
                MainState: {
                    connectAgent: true,
                    isLoading: true
                },
                IssueState: { ...myIssueState, stateWithGif: true }
            })
        );

        fireEvent.click(getByTestId("btn-stop"));
        await new Promise(r => setTimeout(r, 2000));
        expect(spy).toHaveBeenCalledWith({ type: "stopGif" });
    });
});
