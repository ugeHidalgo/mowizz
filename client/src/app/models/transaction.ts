import { Concept } from './concept';

export class Transaction {
    _id: string;
    amount: number;
    transactionType: number;
    concept: Concept;
    comments: string;
    date: Date;
    username: string;
    __v: number;
}

