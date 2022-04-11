import React, {FC, useContext} from 'react';
import {CardType} from "../../types/card";
import {Draggable} from "react-beautiful-dnd";
import InlineEdit from "./InlineEdit";
import {store} from "../../data/DataProvider";
import {LockOpenIcon, LockClosedIcon} from "@heroicons/react/solid";

const Header: FC<{ children?: React.ReactNode }> = ({children}) =>
    (
        <div className="px-4 py-1 sm:px-6">
            {children}
        </div>
    )
const Footer: FC<{ children?: React.ReactNode }> = ({children}) =>
    (
        <div className="px-4 py-4 sm:px-6 flex justify-around">
            {children}
        </div>
    )

interface Props {
    task: CardType;
    index: number;
}

const Card: FC<Props> = ({task, index}) => {
    const {dispatch} = useContext(store);
    // const dispatch = (e) => {
    //   console.log(e);
    // }
    return (
        <Draggable
            key={task.id}
            draggableId={task.id}
            index={index}
        >
            {(provided) => (
                <div
                    className={`p-1 mb-4 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 ${task.protected ? 'pointer-events-none opacity-30' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Header>
                        <InlineEdit setValue={
                            {
                                type: 'tasks',
                                id: task.id,
                                field: 'name',
                                value: task.name,
                            }
                        }/>
                    </Header>
                    <div className="px-4 py-5 sm:p-6">
                        <InlineEdit setValue={
                            {
                                type: 'tasks',
                                id: task.id,
                                field: 'description',
                                value: task.description
                            }
                        }/>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <InlineEdit setValue={
                            {
                                type: 'tasks',
                                id: task.id,
                                field: 'createdDate',
                                value: task.createdDate
                            }
                        }/>
                    </div>
                    <Footer>
                        <span
                            onClick={()=> dispatch({
                                type: 'tasks',
                                id: task.id,
                                field: 'status',
                                value: task.status == 'open' ? 'close' : 'open'
                            })}
                            className={`cursor-pointer px-2 py-1 text-xs font-medium rounded-full ${task.status == 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {task.status}
                        </span>
                        <span
                            onClick={()=> dispatch({
                                type: 'tasks',
                                id: task.id,
                                field: 'protected',
                                value: !task.protected
                            })}
                            className="pointer-events-auto cursor-pointer"
                        >
                            {task.protected ?
                                <LockClosedIcon className="h-5 w-5 text-red-500 self-center"/> :
                                <LockOpenIcon className="h-5 w-5 text-blue-500 self-center"/>
                            }
                        </span>
                    </Footer>
                </div>
            )}
        </Draggable>
    );
};

export default Card;