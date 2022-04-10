import React, {Dispatch, useContext} from 'react';
import {ColumnType} from "../../../types/columnType";
import {store} from "../../../data/DataProvider";
import {ViewGridAddIcon} from "@heroicons/react/solid";
import SaveToggle from "./SaveToggle";
import LanguageSelector from "./LanguageSelector";
import {BoardState} from "../../../types/BoardStateType";
import {actionType} from "../../../types/ActionType";

const addColumn = (board: BoardState, dispatch: Dispatch<actionType>) => {

    const randomId: string = Math.random().toString(16).slice(2); // good enough

    const newColumn = {
        id: randomId,
        name: 'new-Col',
        'taskIds': [],
    } as ColumnType;

    board.colOrder.push(newColumn.id);

    const newState = {
        ...board,
        columns: {
            ...board.columns,
            [newColumn.id]: newColumn,
        },
        colOrder: board.colOrder
    };

    dispatch({type: 'save', payload: newState});
}

const TopBar = () => {
    const {state: board, dispatch} = useContext(store);

    return (
        <div className="container mx-auto flex flex-row-reverse mt-5 tablet:flex-col tablet:items-center pr-5">
            <LanguageSelector/>
            <SaveToggle/>
            <button className="flex w-40 justify-evenly border-2 rounded-md border-gray-600 p-2 bg-white"
                    onClick={() => addColumn(board, dispatch)}>
                {board?.language?.strings.addCard || 'Add column'}
                <ViewGridAddIcon className="h-5 w-5 text-red-500 self-center"/>
            </button>
        </div>
    );
};

export default TopBar;