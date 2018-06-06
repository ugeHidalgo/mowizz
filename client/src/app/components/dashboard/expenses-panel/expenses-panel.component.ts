import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { Router } from '@angular/router';
import { GlobalsService } from '../../../globals/globals.service';
import { AccountService } from '../../../services/account/account.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../../services/transaction/transaction.service';

@Component({
  selector: 'app-expenses-panel',
  templateUrl: './expenses-panel.component.html',
  styleUrls: ['./expenses-panel.component.scss']
})
export class ExpensesPanelComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;
  panelTitle: string;
  expensesTotal: any;

  constructor(
    private router: Router,
    protected globals: GlobalsService,
    private transactionService: TransactionService ) {
      const me = this;

      me.panelTitle = 'Gasto Mes: ';
      me.getAccounts();

      me.gridOptions = <GridOptions>{
        rowSelection: 'single',
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        floatingFilter: true,
        columnDefs: [
          { headerName: 'Fecha', field: 'date', type: 'dateColumn' },
          { headerName: 'Concepto', field: 'concept.name', type: 'textColumn' },
          { headerName: 'Centro de gasto', field: 'costCentre.name', type: 'textColumn'},
          { headerName: 'Cantidad', field: 'amount', type: ['numericColumn', 'numberColumn'] }
        ],
        columnTypes: {
          numberColumn: {
            width: 40,
            valueFormatter: me.currencyFormatter,
            filter: 'agNumberColumnFilter'
          },
          textColumn: {
            width: 50,
            filter: 'agTextColumnFilter'
          },
          dateColumn: {
            width: 55,
            valueFormatter: me.dateFormatter,
            filter: 'agDateColumnFilter',
            filterParams: {
                comparator: me.dateComparator
            }
          }
        }
      };
    }

  // Private Methods
  private getAccounts(): void {
    const me = this;

    me.transactionService.getTransactions(me.globals.userNameLogged)
      .subscribe(transactions => {
        me.rowData = transactions;
        me.expensesTotal = me.getTotalExpenses(transactions);
      });
  }

  private getTotalExpenses(transactions): any {
    let result = 0;
    const currencyPipe = new CurrencyPipe(navigator.language);

    transactions.forEach(transaction => {
        result += transaction.amount;
    });
    return currencyPipe.transform(result, 'EUR', 'symbol');
  }

  private currencyFormatter(params) {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language);

    return currencyPipe.transform(params.value, 'EUR', 'symbol');
  }

  dateFormatter(params) {
    const me = this,
          datePipe = new DatePipe(navigator.language),
          format = 'dd/MM/yyyy';

    return datePipe.transform(params.value, format);
  }

  dateComparator(dateToFilter, cellValue) {
    const dateToFilterISO = dateToFilter.toISOString();

    if (cellValue < dateToFilterISO) {
      return -1;
    } else if (cellValue > dateToFilterISO) {
          return 1;
      } else {
          return 0;
      }
  }

  private onGridReady(params) {
    params.api.sizeColumnsToFit();
  }
}
