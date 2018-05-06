import { Concept } from './concept';
import { CostCentre } from './costcentre';
import { Account } from './account';

export class Transaction {
    _id: string;
    amount: number;
    transactionType: number;
    concept: Concept;
    costCentre: CostCentre;
    account: Account;
    comments: string;
    date: Date;
    username: string;
    __v: number;
}

