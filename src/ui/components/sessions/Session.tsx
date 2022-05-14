import { FC } from "react";
import SessionButton from "./SessionButton";
import { useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { ISessionData } from "../../../indexedDB/indexeddb";

const Session: FC = () => {
    const sessionData = useSelector<StoreType, ISessionData[]>(({ SessionState }) => SessionState.sessionData);

    return (
        <div className="h-100 overflow-auto">
            <ul className="d-flex flex-column-reverse align-items-center">
                {sessionData.map((el, index) => (
                    <SessionButton key={el.title} titleBtn={el.title} index={index} />
                ))}
            </ul>
        </div>
    );
};

export default Session;
