import { FC, FocusEvent, memo, useEffect } from "react";
import * as React from "react";
import { Collapse, Form } from "react-bootstrap";
import { setIssueLog } from "../../actions/issueAction";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { IUserActionType } from "../../../indexedDB/indexeddb";

const AttachIssueLog: FC = () => {
    const currentSession = useSelector<StoreType, number | null>(({ SessionState }) => SessionState.currentSession);
    const logSession = useSelector<StoreType, IUserActionType[]>(({ SessionState }) => {
        const index = currentSession === null ? SessionState.sessionData.length - 1 : currentSession;

        return SessionState.sessionData?.[index]?.log || [];
    });
    const issueLog = useSelector<StoreType, IUserActionType[]>(({ IssueState }) => IssueState.issueLog);
    const isOpenLog = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateOpenLog);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIssueLog(logSession));
    }, [logSession]);

    const handleChangeLog = (event: React.ChangeEvent<any>) => {
        dispatch(setIssueLog(event.target.value));
    };

    //выделить весь текст в textarea
    const handleSelect = (e: FocusEvent<HTMLTextAreaElement>) => {
        e.target.select();
    };

    return (
        <Form.Group className="w-50 d-flex flex-column align-items-center">
            <Collapse in={isOpenLog}>
                <Form.Control
                    as="textarea"
                    style={{ minHeight: "100%" }}
                    rows={3}
                    value={JSON.stringify(issueLog)}
                    onChange={handleChangeLog}
                    onFocus={handleSelect}
                    data-testid="textarea-log"
                />
            </Collapse>
        </Form.Group>
    );
};

export default memo(AttachIssueLog);
