import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import AgentHandler from "../../util/inspectWindow/AgentHandler";
import LogTable from "../../components/log/LogTable";
import RecorderButton from "../../components/common/RecorderButton";
import GeneratedCode from "../../components/generatedCode/GeneratedCode";
import CopyButton from "../../components/generatedCode/CopyButton";
import Session from "../../components/sessions/Session";
import CreateIssues from "../../components/redmineIssue/CreateIssues";
import { ToastContainer } from "react-toastify";
import SaveRecordBtn from "../../components/common/SaveRecordBtn";
import ScaleButton from "../../components/common/ScaleButton";
import { Behaviour } from "../../components/utils/scaleWindow";
import { HotKeysName, isHotkey } from "../hotkeysUtil";

const MainContainer = () => {
    const dispatch = useDispatch();

    //Срабатывания для быстрых сочетаний клавиш
    const handleKeyPress = useCallback(ev => {
        Object.values(HotKeysName).forEach(name => {
            isHotkey(ev, name, dispatch);
        });
    }, []);

    useEffect(() => {
        new AgentHandler(dispatch); //Инициализация агента общения со страницей
    }, []);

    useEffect(() => {
        // повесили слушатель нажатия кнопок
        document.addEventListener("keydown", handleKeyPress);

        //сняли слушатель нажатия кнопок
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div id="main-container">
            <ToastContainer style={{ width: "350px" }} />
            <div id="block1" data-testid="block1">
                <div id="session-block" data-testid="session-block">
                    <div className="title-row bg-dark text-white">
                        <h4 className="px-3">Сессии</h4>
                        <RecorderButton />
                        <CreateIssues />
                        <SaveRecordBtn />
                    </div>
                    <Session />
                </div>

                <div id="log-table-block" data-testid="log-table-block">
                    <div className="title-row bg-dark text-white">
                        <h4 className="px-3">Лог</h4>
                        <ScaleButton behaviour={Behaviour.logS} />
                    </div>
                    <LogTable />
                </div>
            </div>
            <div id="block2" data-testid="block2">
                <div id="generation-code-block" data-testid="generation-code-block">
                    <div className="title-row bg-dark text-white">
                        <h4 className="px-3">Код</h4>
                        <CopyButton />
                        <ScaleButton behaviour={Behaviour.codeS} />
                    </div>
                    <GeneratedCode />
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
