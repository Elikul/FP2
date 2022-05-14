import { FC } from "react";
import { Table } from "react-bootstrap";

const TableOfVersions: FC = () => {
    return (
        <div className="w-100">
            <Table striped bordered hover className="table" data-testid="versionTable">
                <thead>
                    <tr>
                        <th scope="col">Проект</th>
                        <th scope="col">Версия</th>
                        <th scope="col">Ревизия</th>
                    </tr>
                </thead>
                <tbody className="table-body" />
            </Table>
        </div>
    );
};

export default TableOfVersions;
