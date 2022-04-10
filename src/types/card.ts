export interface CardType {
    id: string; // just a helper to traverse the arrays more efficiently. In other words memorization
    name: string;
    description: string;
    createdDate: string;
    status: 'open' | 'closed';
    order: number
    protected: boolean
}