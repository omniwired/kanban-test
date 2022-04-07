import React, {FC, ReactChild} from 'react';
import {CardType} from "../../types/card";

const Header: FC<{children?: React.ReactNode}> = ({children}) =>
    (
        <div className="px-4 py-1 sm:px-6">
            {children}
        </div>
    )
const Footer: FC<{children?: React.ReactNode}> = ({children}) =>
    (
        <div className="px-4 py-4 sm:px-6">
            {children}
        </div>
    )

interface Props {
    task: CardType;
}

const Card: FC<Props> = ({ task }) => {
    return (
        <div
            className="p-1 mb-4 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 draggable" draggable={true}
        >
            <Header>
                {task.name}
            </Header>
            <div className="px-4 py-5 sm:p-6">
                {task.description}
            </div>
            <Footer>
                {task.status}
            </Footer>
        </div>
    );
};

export default Card;