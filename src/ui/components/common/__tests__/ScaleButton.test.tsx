import { render, fireEvent, cleanup } from "@testing-library/react";
import ProviderWithComponent from "../../../store/ProviderWithComponent";
import MainContainer from "../../../containers/MainContainer/MainContainer";

describe("Scale button component", function() {
    afterEach(cleanup);

    it('Должна срабатывать кнопка открытия окна "Код" на весь экран', function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <MainContainer />)({
                MainState: {
                    connectAgent: true,
                    isLoading: false
                },
                SessionState: {
                    currentSession: 3,
                    sessionData: [],
                    startSessionDate: 1618215571034,
                    stopSessionDate: 1618215571086
                }
            })
        );
        fireEvent.click(getByTestId("codeS"));
        expect(getByTestId("block2")).toHaveStyle("width:100%");
        expect(getByTestId("block1")).toHaveStyle("width: 0px");
        expect(getByTestId("block1")).toHaveStyle("visibility: hidden");
        expect(getByTestId("session-block")).toHaveStyle("height: 0px");
        expect(getByTestId("session-block")).toHaveStyle("visibility: hidden");
        expect(getByTestId("log-table-block")).toHaveStyle("height: 0px");
        expect(getByTestId("log-table-block")).toHaveStyle("visibility: hidden");
    });

    it('Должна срабатывать кнопка открытия окна "Лог" на весь экран', function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <MainContainer />)({
                MainState: {
                    connectAgent: true,
                    isLoading: false
                },
                SessionState: {
                    currentSession: 3,
                    sessionData: [],
                    startSessionDate: 1618215571034,
                    stopSessionDate: 1618215571086
                }
            })
        );
        fireEvent.click(getByTestId("logS"));
        expect(getByTestId("log-table-block")).toHaveStyle("height:100%");
        expect(getByTestId("block1")).toHaveStyle("width: 100%");
        expect(getByTestId("block2")).toHaveStyle("width: 0px");
        expect(getByTestId("block2")).toHaveStyle("height: 0px");
        expect(getByTestId("block2")).toHaveStyle("visibility: hidden");
        expect(getByTestId("session-block")).toHaveStyle("height: 0px");
        expect(getByTestId("session-block")).toHaveStyle("visibility: hidden");
        expect(getByTestId("codeS")).toHaveStyle("visibility: hidden");
    });

    it('Должна срабатывать кнопка уменьшения окна "Код" ', function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <MainContainer />)({
                MainState: {
                    connectAgent: true,
                    isLoading: false
                },
                SessionState: {
                    currentSession: 3,
                    sessionData: [],
                    startSessionDate: 1618215571034,
                    stopSessionDate: 1618215571086
                }
            })
        );
        fireEvent.click(getByTestId("codeS"));
        fireEvent.click(getByTestId("codeS"));
        expect(getByTestId("block1")).toHaveStyle("width: 50%");
        expect(getByTestId("block1")).toHaveStyle("visibility: visible");
        expect(getByTestId("session-block")).toHaveStyle("height:50%");
        expect(getByTestId("session-block")).toHaveStyle("visibility: visible");
        expect(getByTestId("log-table-block")).toHaveStyle("height:50%");
        expect(getByTestId("log-table-block")).toHaveStyle("visibility: visible");
        expect(getByTestId("block2")).toHaveStyle("width: 50%");
    });

    it('Должна срабатывать кнопка уменьшения окна "Лог" ', function() {
        const { getByTestId } = render(
            ProviderWithComponent(() => <MainContainer />)({
                MainState: {
                    connectAgent: true,
                    isLoading: false
                },
                SessionState: {
                    currentSession: 3,
                    sessionData: [],
                    startSessionDate: 1618215571034,
                    stopSessionDate: 1618215571086
                }
            })
        );
        fireEvent.click(getByTestId("logS"));
        fireEvent.click(getByTestId("logS"));
        expect(getByTestId("block1")).toHaveStyle("width: 50%");
        expect(getByTestId("session-block")).toHaveStyle("height:50%");
        expect(getByTestId("session-block")).toHaveStyle("visibility: visible");
        expect(getByTestId("log-table-block")).toHaveStyle("height:50%");
        expect(getByTestId("log-table-block")).toHaveStyle("visibility: visible");
        expect(getByTestId("block2")).toHaveStyle("width: 50%");
        expect(getByTestId("codeS")).toHaveStyle("visibility: visible");
    });
});
