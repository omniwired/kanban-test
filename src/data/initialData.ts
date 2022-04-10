import generateFakeCards from "./generators";
import {ColumnType} from "../types/columnType";
import {BoardState} from "../types/BoardStateType";
const fakeCards = generateFakeCards(7);

const initialData = {
    tasks: fakeCards,
    columns: {
        'column-1': {
            id: 'column-1',
            name: 'To do',
            taskIds: Object.keys(fakeCards).slice(0, 3),
        } as ColumnType,
        'column-2': {
            id: 'column-2',
            name: 'Done',
            taskIds: Object.keys(fakeCards).slice(3),
        } as ColumnType
    },
    colOrder: ['column-1', 'column-2'],
    persistTasks: false,
    language: null
} as BoardState;

export default initialData;