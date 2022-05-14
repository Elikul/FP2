import { render, cleanup } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import dayjs from "dayjs";
import { ISessionData } from "../../../../indexedDB/indexeddb";
import Session from "../Session";

describe("Session component", function() {
    afterEach(cleanup);

    const session: ISessionData[] = [
        {
            dateOfStart: 1618215571000,
            dateOfEnd: 1618215571079,
            title: dayjs(1618215571079).format("DD-MM-YYYY HH:mm:ss"),
            generatedCode: [],
            log: [],
            screenshots: [],
            recordUrl: ""
        }
    ];

    it("Должен выводить сессии", function() {
        const { queryByText } = render(
            ProviderWithComponent(() => <Session />)({
                SessionState: {
                    currentSession: 1,
                    sessionData: session,
                    startSessionDate: 1618215571051,
                    stopSessionDate: 1618215571079
                }
            })
        );

        expect(queryByText(dayjs(1618215571079).format("DD-MM-YYYY HH:mm:ss"))).toBeInTheDocument();
    });
});
