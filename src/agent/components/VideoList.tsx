import { FC, useState, useEffect } from "react";
import { getsDataFromDB, StoreName, VideoInfo } from "../../indexedDB/indexeddb";
import { formatDateDownload, formatDateTitle } from "../utils/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
import { Table } from "react-bootstrap";

const LIMIT: number = 5;

/**
 * Список последних 5 видео
 * @constructor
 */
const VideoList: FC = () => {
    const [videos, setVideos] = useState<VideoInfo[]>([]);

    useEffect(() => {
        getsDataFromDB(StoreName.video).then(items => {
            const lastVideos = items.slice(-LIMIT).reverse() as VideoInfo[];
            setVideos(lastVideos);
        });
    }, []);

    return (
        <Table striped bordered hover size="sm" className="text-center">
            <thead>
                <tr>
                    <th>Запись</th>
                    <th>
                        <FontAwesomeIcon icon={faDownload} size="xs" />
                    </th>
                </tr>
            </thead>
            <tbody>
                {videos.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{formatDateTitle(item.date)}</td>
                            <td>
                                <a className="downloadLinks" href={item.video} download={formatDateDownload(item.date)}>
                                    <FontAwesomeIcon icon={faDownload} size="xs" />
                                </a>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default VideoList;
