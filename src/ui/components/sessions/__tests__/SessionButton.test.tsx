import { render, cleanup } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import dayjs from "dayjs";
import MainComponent from "../../../containers/MainContainer/MainContainer";

describe("Session button component", function() {
    afterEach(cleanup);

    it("Должны быть две кнопки сессий", function() {
        const { getByText } = render(
            ProviderWithComponent(() => <MainComponent />)({
                SessionState: {
                    currentSession: 1,
                    sessionData: [
                        {
                            dateOfStart: 1625656061548,
                            dateOfEnd: 1625656067437,
                            title: dayjs(1625656067437).format("DD-MM-YYYY HH:mm:ss"),
                            log: [],
                            generatedCode: [],
                            screenshots: [],
                            recordUrl: ""
                        },
                        {
                            dateOfStart: 1625821832749,
                            dateOfEnd: 0,
                            title: "Текущая",
                            log: [],
                            generatedCode: [],
                            screenshots: [],
                            recordUrl: ""
                        }
                    ],
                    startSessionDate: 1625821832749,
                    stopSessionDate: 0
                }
            })
        );

        expect(getByText("Текущая")).toBeInTheDocument();
        expect(getByText(dayjs(1625656067437).format("DD-MM-YYYY HH:mm:ss"))).toBeInTheDocument();
    });
});
