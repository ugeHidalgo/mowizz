import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../../globals/globals.service';
import { CurrencyPipe } from '@angular/common';
import { TransactionTypes } from '../../../models/transactionType';
import { TransactionService } from '../../../services/transaction/transaction.service';

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
    private transactionService: TransactionService
  ) {
    this.getMonthlyIncomes();
    this.getMonthlyExpenses();
  }

  public getBalanceFieldColor(){
    const me = this,
          balance = me.incomes + me.expenses

    return ( balance < 0 ) ? "#FF0000" : "#000000";
  }

  // Private Methods
  private getMonthlyIncomes(): void {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language),
          today = new Date(),
          year = today.getFullYear(),
          month = today.getMonth(),
          firstDayOfMonth = new Date(year, month, 1),
          lastDayOfMonth = new Date(year, month + 1, 0);

    me.transactionService.getTransactionsOnDates(me.globals.userNameLogged, TransactionTypes[0], firstDayOfMonth, lastDayOfMonth)
      .subscribe(transactions => {
        me.incomes = me.getTotals(transactions);
        me.formattedIncomes = currencyPipe.transform(me.incomes, 'EUR', 'symbol');
      });
  }

  private getMonthlyExpenses(): void {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language),
          today = new Date(),
          year = today.getFullYear(),
          month = today.getMonth(),
          firstDayOfMonth = new Date(year, month, 1),
          lastDayOfMonth = new Date(year, month + 1, 0);

    me.transactionService.getTransactionsOnDates(me.globals.userNameLogged, TransactionTypes[1], firstDayOfMonth, lastDayOfMonth)
      .subscribe(transactions => {
        me.expenses = me.getTotals(transactions);
        me.formattedExpenses = currencyPipe.transform(me.expenses * -1, 'EUR', 'symbol');
        me.formattedBalance = currencyPipe.transform(me.incomes + me.expenses, 'EUR', 'symbol');
      });
  }

  private getTotals(transactions): any {
    let result = 0;
    const currencyPipe = new CurrencyPipe(navigator.language);

    transactions.forEach(transaction => {
        result += transaction.amount;
    });
    return result;
  }

  private currencyFormatter(params) {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language);

    return currencyPipe.transform(params.value, 'EUR', 'symbol');
  }

}
