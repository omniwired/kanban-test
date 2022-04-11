import React, {createContext, Dispatch, FC, useReducer} from 'react';
import initialData from "./initialData";
import generateFakeCards from "./generators";
import {BoardState} from "../types/BoardStateType";
import {actionType} from "../types/ActionType";
import {LanguageType} from "../types/LanguageType";

// window.localStorage.clear();
// @ts-ignore
const loadedData = window.localStorage.getItem('terra-test') ? JSON.parse(window.localStorage.getItem('terra-test')) : initialData;

const store = createContext<{
    state: BoardState,
    dispatch: Dispatch<actionType>
}>(loadedData);


const {Provider} = store;

const DataProvider: FC<{ children?: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer((state: BoardState, action: actionType) => {
        switch (action.type) {
            /*
            Dear Terraform labs reviewers:
              Here we can add a single point to bundle all the
              responsibilities and strategies regarding state.

              I'm using just one at this point in the interest of
              time.
             */
            case 'save':
                if (action.payload) {
                    state = action.payload;
                }
                break;
            case 'remove-col':
                if (action.id) {
                    delete (state.columns[action.id]);
                    state.colOrder = Object.keys(state.columns);
                }
                break;
            case 'add-card':
                const card = generateFakeCards(1, state?.language?.code);
                const cardId = Object.keys(card);

                return {
                    ...state,
                    tasks: {
                    ...state.tasks,
                    ...card
                    },
                    columns: {
                        ...state.columns,
                        [action.id as string]: {
                            ...state.columns[action.id as string],
                            // @ts-ignore
                            taskIds: [...state.columns[action.id]["taskIds"], cardId]
                        }
                    }
                };
            case 'tasks':
                // @ts-ignore
                state.tasks[action.id][action.field] = action.value;
                break;
            case 'column':
                // @ts-ignore
                state.columns[action.id][action.field] = action.value;
                break;
            case 'persist':
                if (typeof action.value === "boolean") {
                    state.persistTasks = action.value;
                }
                break;
            case 'language':
                state.language = action.value as LanguageType;
                break;
            default:
                throw new Error();
        }
        if (state.persistTasks) {
            const pureMagic = JSON.stringify(state, function replacer(key, value) {
                if (Array.isArray(value) && value.length === 0) {
                    return {...value}; // Converts empty array with string properties into a POJO
                }
                return value;
            });
            window.localStorage.setItem('terra-test', pureMagic);
        } else {
            window.localStorage.clear();
        }
        return {
            ...state
        };
    }, loadedData);

    return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, DataProvider}