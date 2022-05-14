import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../reducers";

const GeneratedCode: FC = () => {
    const currentSession = useSelector<StoreType, number | null>(({ SessionState }) => SessionState.currentSession);
    const records = useSelector<StoreType, string>(({ SessionState }) => {
        const index = currentSession === null ? SessionState.sessionData.length - 1 : currentSession;

        if (!SessionState.sessionData.length) {
            return "";
        }

        return SessionState.sessionData[index].generatedCode.join("\n");
    });

    //выделить весь текст в textarea
    const handleSelect = (e: any) => {
        e.target.select();
    };

    useEffect(() => {
        document.body.classList.remove("wait-data");
    }, [records]);

    return (
        <div id="code" className="generated-code">
            <textarea
                id="code-text"
                className="generation-code-text"
                placeholder="test-code"
                value={records}
                readOnly
                wrap="off"
                onFocus={handleSelect}
            />
        </div>
    );
};

export default GeneratedCode;
