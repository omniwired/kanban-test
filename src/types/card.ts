export interface CardType {
    name: string;
    description: string;
    createdDate: Date;
    status: 'open' | 'closed';
    order: number
}