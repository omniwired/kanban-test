export interface LanguageType {
    id: number;
    name: string;
    code: string;
    strings: {
        addColumn: string;
        addCard: string;
        persistenceText: string;
        deleteColumn: string;
        confirm: string;
    }
}