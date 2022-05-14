import { ComponentType, FC } from "react";
import { Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import AutoSizer from "react-virtualized-auto-sizer";
import { useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { toFormLog } from "../../analysis/Logger";
import { IUserActionType } from "../../../indexedDB/indexeddb";

const LogTable: FC = () => {
    const currentSession = useSelector<StoreType, number | null>(({ SessionState }) => SessionState.currentSession);
    const records = useSelector<StoreType, IUserActionType[]>(({ SessionState }) => {
        const index = currentSession === null ? SessionState.sessionData.length - 1 : currentSession;

        if (!SessionState.sessionData.length) {
            return [];
        }

        return SessionState.sessionData[index].log;
    });

    // Для создания виртуального скроллинга по таблице
    const renderRow: ComponentType<ListChildComponentProps> = ({ index, style }) => (
        <Row className="border-bottom table-row m-0" style={style}>
            <Col xs={6} md={4} className="text-center">
                {dayjs(records[index].date).format("DD-MM-YYYY HH:mm:ss")}
            </Col>
            <Col xs={12} md={8} title={toFormLog(records)[index]} className="text-dots">
                {toFormLog(records)[index]}
            </Col>
        </Row>
    );

    if (!records?.length) {
        document.body.classList.remove("wait-data");
        return null;
    }

    return (
        <div className="log-table-body">
            <AutoSizer>
                {({ height, width }) => (
                    <List height={height} width={width} itemSize={35} itemCount={records.length}>
                        {renderRow}
                    </List>
                )}
            </AutoSizer>
        </div>
    );
};

export default LogTable;
