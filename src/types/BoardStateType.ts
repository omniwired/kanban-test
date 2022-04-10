import {ColumnType} from "./columnType";
import {GroupCards} from "./GroupCards";
import {LanguageType} from "./LanguageType";

export interface BoardState {
    tasks: GroupCards[];
    columns: {
        [key: string]: ColumnType
    };
    colOrder: string[];
    persistTasks: boolean;
    language: LanguageType | null;
}