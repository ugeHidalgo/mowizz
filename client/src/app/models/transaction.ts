import { Concept } from './concept';
import { CostCentre } from './costcentre';

export class Transaction {
    _id: string;
    amount: number;
    transactionType: number;
    concept: Concept;
    costCentre: CostCentre;
    comments: string;
    date: Date;
    username: string;
    __v: number;
}

