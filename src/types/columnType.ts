import type {CardType} from "./card";
export interface ColumnType {
    name: string;
    order: number
    cards?: CardType[]
}