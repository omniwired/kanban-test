import React, {FC, ReactChild} from 'react';
import Card from "./Card";
import {CardType} from "../../types/card";
import {ViewListIcon, TrashIcon} from "@heroicons/react/solid";

const Header: FC<{ children?: React.ReactNode }> = ({children}) =>
    (
        <div className="px-4 py-1 sm:px-6">
            <div className="flex justify-between">
                <ViewListIcon className="h-5 w-5 text-black self-center"/>
                {children}
            </div>
        </div>
    )
const Footer: FC<{ children?: React.ReactNode }> = ({children}) =>
    (
        <div className="px-4 py-4 sm:px-6">
            <div className="flex justify-between">
                {children}
                <TrashIcon className="h-5 w-5 text-red-500 self-center"/>
            </div>
        </div>
    )

interface Props {
    header?: ReactChild;
    footer?: ReactChild;
    cards: CardType[];
}

const drop = (e) => {
    console.log(e);
    debugger;
}

const Column: FC<Props> = ({header, footer, cards}) => {
    return (
        <div
            className="bg-amber-100 overflow-hidden shadow rounded-lg divide-y divide-gray-200 max-w-screen-sm m-2"
        >
            {header && <Header>
                {header}
            </Header>}
            <div className="px-4 py-5 sm:p-6 drop-target" onDrop={drop}>
                {cards.length ? cards.map((card) => (
                    <Card task={card}/>
                )) : "No cards found"}
            </div>
            {footer && <Footer>
                {footer}
            </Footer>}
        </div>
    );
};

export default Column;