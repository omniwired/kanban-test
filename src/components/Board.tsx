import React, {useEffect, useState} from 'react';

import type {ColumnType} from "../types/columnType";
import type {CardType} from "../types/card";

import Column from './base/Column';
import { faker } from '@faker-js/faker';
import {Simulate} from "react-dom/test-utils";
import drag = Simulate.drag;

const generateFakeCards = (howMany:number):CardType[] => {
    // faker.setLocale('ko');

    const cards = []
    for (let i = 0; i < howMany; i++) {
        cards.push({
            'name': `${faker.name.jobTitle()} ${faker.name.firstName()} ${faker.name.lastName()}`,
            'description': faker.finance.accountName(),
            'createdDate': faker.date.past(1).getDate(),
            'status': Math.random() < 0.5 ? 'open' : 'closed', // faker boolean is deprecated
            'order': i
        } as unknown as CardType);
    }
    return cards;
}

const Board = () => {

    useEffect(()=>{
        const draggables = document.querySelectorAll('.draggable')
        const containers = document.querySelectorAll('.drop-target')

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', (e) => {
                console.log(e.dataTransfer);
                draggable.classList.add('opacity-30')
                draggable.classList.add('dragging');
                draggable.classList.add('border-2');
                draggable.classList.add('border-dashed')
                draggable.classList.add('border-sky-500');
                draggable.classList.add('border-dashed')
            })

            draggable.addEventListener('ondrag', (e) => {
                // console.log(e);
                draggable.classList.remove('dragging')
            })
        })

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault()
                const afterElement = getDragAfterElement(container, e.clientY)
                const draggable = document.querySelector('.dragging')
                if (afterElement == null) {
                    container.appendChild(draggable)
                } else {
                    container.insertBefore(draggable, afterElement)
                }
            })
            container.addEventListener('drop', e=> {
                console.log('drop', e);
            });
        })

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = y - box.top - box.height / 2
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element
        }
    }, [])
    const [columns, setColumns]  = useState(
        [
            {
                name: 'one',
                order: 1,
                cards: generateFakeCards(5)
            },
            {
                name: 'two',
                order: 2,
                cards: generateFakeCards(3)
            },
            {
                name: 'three',
                order: 3,
                cards: generateFakeCards(0)
            }
        ] as ColumnType[]
    )

    return (
        <div className="flex container">
            {columns.map((item, index)=>{
              return <Column header={item.name} footer={'Footer'} cards={item.cards} key={index} handleColumns={setColumns}>
                    <span>{item.name}</span>
                </Column>
            })}
        </div>
    );
};

export default Board;