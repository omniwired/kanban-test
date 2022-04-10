import {BoardState} from "./BoardStateType";
import {CardType} from "./card";
import {LanguageType} from "./LanguageType";

export interface actionType {
    type: any;
    payload?: BoardState;
    id?: string;
    field?: string;
    value?: boolean | string | CardType | LanguageType;
}