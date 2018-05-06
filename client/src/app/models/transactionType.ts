export class TransactionType {
    value: number;
    name: string;
}

export const TransactionTypes: TransactionType[] = [
    { value: 1, name: 'Ingreso' },
    { value: 2, name: 'Gasto' }
];
