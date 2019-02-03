import { Concept } from './concept';
import { BudgetDetail } from './budgetDetail';

export class Budget {
  _id: string;
  name: string;
  description: string;
  active: boolean;
  created: Date;
  updated: Date;
  username: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  budgetDetails: BudgetDetail[];
  __v: number;
}