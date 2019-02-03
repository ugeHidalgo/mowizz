import { Component, OnInit, Input } from '@angular/core';
import { Budget } from '../../../../../models/budget';

@Component({
  selector: 'app-budget-details',
  templateUrl: './budget-details.component.html',
  styleUrls: ['./budget-details.component.scss']
})
export class BudgetDetailsComponent implements OnInit {

  @Input() budget: Budget;

  constructor() { }

  ngOnInit() {
  }

}
