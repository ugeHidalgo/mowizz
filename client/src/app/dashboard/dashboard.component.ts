import { Component, OnInit, HostBinding } from '@angular/core';
import { GlobalsService } from '../globals/globals.service';
import { GridOptions } from 'ag-grid';
import { Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(
    private router: Router,
    protected globals: GlobalsService,
    private accountService: AccountService ) {
      const me = this;

      me.getAccounts();

      me.gridOptions = <GridOptions>{
        rowSelection: 'single',
        enableColResize: true,
        enableSorting: true,
        enableFilter: true,
        floatingFilter: true,
        columnDefs: [
          { headerName: 'Descripción', field: 'description', type: 'textColumn', width: 120 },
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

    onGridReady(params) {
      params.api.sizeColumnsToFit();
    }

  // Private Methods
  private getAccounts(): void {
    const me = this;

    me.accountService.getAccounts(me.globals.userNameLogged)
      .subscribe(accounts => {
        me.rowData = accounts;
      });
  }

  currencyFormatter(params) {
    const me = this,
          currencyPipe = new CurrencyPipe(navigator.language);

    return currencyPipe.transform(params.value, 'EUR', 'symbol');
  }
}
