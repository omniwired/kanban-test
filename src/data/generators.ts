import {CardType} from "../types/card";
import {faker} from "@faker-js/faker";

interface GroupCards {
    [key: string]: CardType
}

const generateFakeCards = (howMany: number, locale: string = 'en'): GroupCards[] => {
    faker.setLocale(locale);

    const cards: GroupCards[] = []
    for (let i = 1; i <= howMany; i++) {
        const randomId: string = Math.random().toString(16).slice(2); // good enough
        // @ts-ignore
        cards[randomId] = {
            'id': randomId, //helper
            'name': `${faker.name.firstName()} ${faker.name.lastName()}`,
            'description': faker.address.city(),
            'createdDate': faker.date.past(5),
            'status': Math.random() < 0.5 ? 'open' : 'closed', // faker boolean is deprecated
            'order': i,
            'protected': false
        } as CardType;

    }
    return cards;
}

export default generateFakeCards