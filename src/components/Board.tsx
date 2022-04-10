import React, {useContext} from 'react';
import {store} from "../data/DataProvider";
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import Column from './base/Column';
// import BoardSelector from "./layout/Top/BoardSelector";

const Board = () => {

    const {state:board,dispatch} = useContext(store);

    const onDragEnd = (result: DropResult) => {
        let newState = null;

        const {destination, source, draggableId, type} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(board.colOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            newState = {
                ...board,
                'colOrder': newColumnOrder,
            };

        } else {
            const sourceColumn = board.columns[source.droppableId];
            const targetColumn = board.columns[destination.droppableId];

            if (sourceColumn === targetColumn) {
                const newTaskIds = Array.from(sourceColumn.taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...targetColumn,
                    'taskIds': newTaskIds,
                };

                newState = {
                    ...board,
                    columns: {
                        ...board.columns,
                        [newColumn.id]: newColumn,
                    },
                };

            } else {
                // Moving from one list to another
                const startTaskIds = Array.from(sourceColumn.taskIds);
                startTaskIds.splice(source.index, 1);
                const newStart = {
                    ...sourceColumn,
                    taskIds: startTaskIds,
                };

                const finishTaskIds = Array.from(targetColumn.taskIds);
                finishTaskIds.splice(destination.index, 0, draggableId);
                const newFinish = {
                    ...targetColumn,
                    taskIds: finishTaskIds,
                };

                newState = {
                    ...board,
                    columns: {
                        ...board.columns,
                        [newStart.id]: newStart,
                        [newFinish.id]: newFinish,
                    },
                };

            }
        }

        if (newState) {
            dispatch({type:'save', payload: newState});
        }

    };

    return (
        <div className="flex container">
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {(provided) =>
                        <div
                            className="px-4 py-5 sm:p-6 flex flex-grow"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >

                            {board.colOrder.map((columnId, index) => {
                                const column = board.columns[columnId];
                                const tasks = column.taskIds.map((taskId: string) => {
                                    // @ts-ignore
                                    return board.tasks[taskId];
                                });

                                return <Column header={column.name} footer={'Footer'} cards={tasks} key={columnId}
                                               columnId={columnId} index={index}>

                                </Column>
                            })}

                    {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Board;