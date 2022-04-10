import React, {FC, useContext} from 'react';
import Card from "./Card";
import {CardType} from "../../types/card";
import {ViewListIcon, TrashIcon} from "@heroicons/react/solid";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {store} from "../../data/DataProvider";
import InlineEdit from "./InlineEdit";
import {PlusCircleIcon} from "@heroicons/react/outline";

interface Props {
    header?: string;
    footer?: string;
    columnId: string;
    index: number;
    cards: CardType[];
}


const Column: FC<Props> = ({header, footer, cards, columnId, index}) => {
    const {state, dispatch} = useContext(store);

    return (
        <Draggable draggableId={columnId} index={index}>
            {(provided) =>
                <div
                    className="bg-amber-100 overflow-hidden shadow rounded-lg divide-y divide-gray-200 max-w-screen-sm m-2 flex flex-col h-full"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    {header && <div className="px-4 py-1 sm:px-6">
                        <div className="flex justify-between">
                            <div className="self-center" ref={provided.innerRef} {...provided.dragHandleProps}>
                                <ViewListIcon className="h-5 w-5 text-black"/>
                            </div>
                            <InlineEdit setValue={
                                {
                                    type: 'column',
                                    id: columnId,
                                    field: 'name',
                                    value: header
                                }
                            }/>
                        </div>
                    </div>}

                    <Droppable droppableId={columnId} key={columnId} type="task">
                        {(provided) =>
                            <div
                                className="px-4 py-5 sm:p-6 h-full"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {cards.map((task, index) => <Card key={task.id} task={task} index={index}/>)}
                                {provided.placeholder}
                            </div>
                        }
                    </Droppable>
                    {footer &&  <div className="px-4 py-4 sm:px-6">
                        <div className="flex justify-between">
                            <button className="flex w-32 justify-evenly border-2 rounded-md border-gray-600 bor p-2 bg-white" onClick={()=> dispatch({type:'add-card', id: columnId})}>
                                {state?.language?.strings.addCard || 'Add Card'}
                                <PlusCircleIcon className="h-5 w-5 text-red-500 self-center"/>
                            </button>
                            <button onClick={
                                ()=> {
                                    if (cards.length > 0) {
                                        alert(state?.language?.strings.deleteColumn || 'Only empty Columns are allowed to be deleted.')
                                    } else {
                                        confirm(state?.language?.strings.confirm || 'Are you sure?') ? dispatch({type:'remove-col', id: columnId}) : '';
                                    }
                                }
                            }>
                                <TrashIcon className="h-5 w-5 text-red-500 self-center"/>
                            </button>
                        </div>
                    </div>}
                </div>
            }
        </Draggable>
    );
};

export default Column;