import { Dispatch,FC, memo } from "react";
import { Collapse, Form } from "react-bootstrap";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector} from "react-redux";
import { StoreType } from "../../reducers";
import { InfoScreenshot } from "../../../indexedDB/indexeddb";
import { setScreenshots } from "../../actions/issueAction";
import ViewerScreenshots from "./ViewerScreenshots";
import { PayloadAction } from "typesafe-actions";

//вычисление
const reorder = (list: InfoScreenshot[], startIndex: number, endIndex: number) => {
    //КПЗ
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

//действие
const setNewState = (dispatch:Dispatch<PayloadAction<"SET_SCREENSHOTS", InfoScreenshot[]>>,newStateScreenshots:InfoScreenshot[]) => {
    dispatch(setScreenshots(newStateScreenshots));
}

const AttachScreenshots: FC = () => {
    const screenshots = useSelector<StoreType, InfoScreenshot[]>(({ IssueState }) => IssueState.screenshots);
    const isOpen = useSelector<StoreType, boolean>(({ IssueState }) => IssueState.stateOpenScreenshot);

    const dispatch = useDispatch();

    //действие
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const newStateScreenshots = reorder(screenshots, result.source.index, result.destination.index);
        setNewState(dispatch,newStateScreenshots);
    };

    return (
        <Form.Group className="w-50 d-flex flex-column align-items-center">
            <Collapse in={isOpen}>
                <div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    <ViewerScreenshots />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </Collapse>
        </Form.Group>
    );
};

export default memo(AttachScreenshots);
