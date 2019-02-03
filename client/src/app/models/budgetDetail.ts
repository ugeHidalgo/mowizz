import { Concept } from './concept';
import { TransactionType } from './transactionType';

export class BudgetDetail {
  _id: string;
  transactionType: TransactionType;
  concept: Concept;
  amount: number;
  active: boolean;
  created: Date;
  updated: Date;
  username: string;
  __v: number;
}