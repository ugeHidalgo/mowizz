import { Concept } from './concept';

export class Budget {
  _id: string;
  name: string;
  description: string;
  comments: string;
  active: boolean;
  created: Date;
  updated: Date;
  username: string;
  startDate: Date;
  endDate: Date;
  concepts: [ Concept ];
  __v: number;
}