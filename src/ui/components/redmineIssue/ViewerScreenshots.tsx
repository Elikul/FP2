import { Dispatch,Fragment, FC, memo, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import RViewerJS from "viewerjs-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../reducers";
import { InfoScreenshot } from "../../../indexedDB/indexeddb";
import { setScreenshots } from "../../actions/issueAction";
import dayjs from "dayjs";

//вычисление
const getImgToDel = (images:InfoScreenshot[],idDelImg:string):InfoScreenshot | undefined  => {
    //КПЗ
    const copyImages = [...images];
    return copyImages.find(img => img.date.toString() == idDelImg);
}

//действие
const deleteImg = (dispatch:Dispatch<any>, screenshots:InfoScreenshot[],image:InfoScreenshot | undefined) =>{
    if(!image) return;

    //КПЗ
    const copyScreenshots = [...screenshots];
    const newState =  copyScreenshots.filter(img => img !== image);
    dispatch(setScreenshots(newState));
}

const ViewerScreenshots: FC = () => {
    const currentSession = useSelector<StoreType, number | null>(({ SessionState }) => SessionState.currentSession);
    const imgSession = useSelector<StoreType, InfoScreenshot[]>(({ SessionState }) => {
        const index = currentSession === null ? SessionState.sessionData.length - 1 : currentSession;

        return SessionState.sessionData?.[index]?.screenshots || [];
    });
    const screenshots = useSelector<StoreType, InfoScreenshot[]>(({ IssueState }) => IssueState.screenshots);

    const dispatch = useDispatch();

    //действие
    useEffect(() => {
       dispatch(setScreenshots(imgSession));
    }, [imgSession]);

    //действие
    const onDeleteHandler = (idDelImg: string) => {
        const img = getImgToDel(screenshots,idDelImg);
        deleteImg(dispatch,screenshots,img);
    };

    //данные
    const options = {
        transition: false
    };

    return (
        <Fragment>
            <RViewerJS options={options}>
                {screenshots.map((screen, index) => (
                    <Draggable key={screen.date.toString()} draggableId={screen.date.toString()} index={index}>
                        {provided => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div className="position-relative w-50 me-auto ms-auto mt-1">
                                    <Image
                                        className="img-screenshot"
                                        src={screen.screenshot}
                                        title={dayjs(screen.date).format(`DD-MM-YYYY HH:mm:ss`)}
                                        alt={dayjs(screen.date).format(`DD-MM-YYYY HH:mm:ss`)}
                                        data-testid={`screenshot${index}`}
                                    />
                                    <Button
                                        className="btn-position btn-sm btn-light btn-opacity"
                                        onClick={() => onDeleteHandler(screen.date.toString())}
                                        data-testid={`delete-screenshot${index}`}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Draggable>
                ))}
            </RViewerJS>
        </Fragment>
    );
};

export default memo(ViewerScreenshots);
