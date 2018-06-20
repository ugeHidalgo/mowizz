import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../../globals/globals.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-monthly-balance-panel',
  templateUrl: './monthly-balance-panel.component.html',
  styleUrls: ['./monthly-balance-panel.component.scss']
})
export class MonthlyBalancePanelComponent {

  panelTitle = 'Balance mensual';

  incomes: number;
  expenses: number;

  formattedIncomes: string;
  formattedExpenses: string;
  formattedBalance: string;

  constructor(
    protected globals: GlobalsService,
  ) {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language);

    me.incomes = me.globals.monthlyIncomes;
    me.expenses = this.globals.monthlyExpenses;

    me.formattedIncomes = currencyPipe.transform(me.incomes, 'EUR', 'symbol');
    me.formattedExpenses = currencyPipe.transform(me.expenses, 'EUR', 'symbol');
    me.formattedBalance = currencyPipe.transform(me.incomes - me.expenses, 'EUR', 'symbol');

  }

  private currencyFormatter(params) {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language);

    return currencyPipe.transform(params.value, 'EUR', 'symbol');
  }

}
