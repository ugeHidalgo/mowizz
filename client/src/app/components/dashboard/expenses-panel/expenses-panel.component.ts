import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';
import { Router } from '@angular/router';
import { GlobalsService } from '../../../globals/globals.service';
import { AccountService } from '../../../services/account/account.service';
import { CurrencyPipe } from '@angular/common';

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
    private accountService: AccountService ) {
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
          { headerName: 'Descripción', field: 'description', type: 'textColumn', width: 100 },
          { headerName: 'Cantidad', field: 'amount', type: ['numericColumn', 'numberColumn'] }
        ],
        columnTypes: {
          numberColumn: {
            width: 50,
            valueFormatter: me.currencyFormatter,
            filter: 'agNumberColumnFilter'
          },
          textColumn: {
            width: 50,
            filter: 'agTextColumnFilter'
          }
        }
      };
    }

  // Private Methods
  private getAccounts(): void {
    const me = this;

    me.accountService.getAccounts(me.globals.userNameLogged)
      .subscribe(accounts => {
        me.rowData = accounts;
        me.expensesTotal = me.getTotalExpenses(accounts);
      });
  }

  private getTotalExpenses(accounts): any {
    let result = 0;
    const currencyPipe = new CurrencyPipe(navigator.language);

    accounts.forEach(account => {
      result += account.amount;
    });
    return currencyPipe.transform(result, 'EUR', 'symbol');
  }

  private currencyFormatter(params) {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language);

    return currencyPipe.transform(params.value, 'EUR', 'symbol');
  }

  private onGridReady(params) {
    params.api.sizeColumnsToFit();
  }
}
