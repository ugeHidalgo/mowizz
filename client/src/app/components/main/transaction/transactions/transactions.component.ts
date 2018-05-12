import { Component, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { Location, DatePipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { TransactionService } from '../../../../services/transaction/transaction.service';
import { ToastsManager } from 'ng2-toastr';
import { GridOptions } from 'ag-grid/main';
import { GlobalsService } from '../../../../globals/globals.service';
import { TransactionType, TransactionTypes } from '../../../../models/transactionType';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  transactionTypes: TransactionType[] = TransactionTypes;

  constructor(
    private router: Router,
    protected globals: GlobalsService,
    private transactionService: TransactionService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) {
        const me = this;

      me.toastr.setRootViewContainerRef(vcr);
      me.getTransactions();

      me.gridOptions = <GridOptions>{
        rowSelection: 'single',
        enableColResize: true,
        enableFilter: true,
        floatingFilter: true,
        enableSorting: true,
        columnDefs: [
          { headerName: 'Fecha', field: 'date', type: 'dateColumn' },
          { headerName: 'Tipo', field: 'transactionType', type: 'transactionTypeColumn' },
          { headerName: 'Cantidad', field: 'amount', type: ['numericColumn', 'numberColumn'] },
          { headerName: 'Concepto', field: 'concept.name', type: 'textColumn' },
          { headerName: 'Centro de gasto', field: 'costCentre.name', type: 'textColumn'},
          { headerName: 'Cuenta', field: 'account.name', type: 'textColumn'},
          { headerName: 'Comentarios', field: 'comments', width: 100, suppressFilter: true }
        ],
        columnTypes: {
          numberColumn: {
            width: 30,
            valueFormatter: me.currencyFormatter,
            filter: 'agNumberColumnFilter'
          },
          textColumn: {
            width: 50,
            filter: 'agTextColumnFilter'
          },
          transactionTypeColumn: {
            width: 25,
            valueFormatter: me.transactionTypeFormatter,
            filter: 'agTextColumnFilter',
            filterParams: {
              filterOptions: ['contains', 'notContains'],
              textCustomComparator: me.transactionTypeComparator
            }
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

  onGridReady(params) {
      params.api.sizeColumnsToFit();
  }

  currencyFormatter(params) {
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

  transactionTypeFormatter(params) {
    const transactionType = TransactionTypes.find(function(x) { return x.value === params.value; });
    return transactionType.name;
  }

  transactionTypeComparator (filter, value, filterText) {
    const filterTextLowerCase = filterText.toLowerCase(),
          valueToFilter = TransactionTypes.find(function(x) { return x.value.toString() === value; });
    let valueLowerCase = '';

    if (valueToFilter) {
      valueLowerCase = valueToFilter.name.toLowerCase();
    } else {
      return false;
    }

    switch (filter) {
      case 'contains':
        return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
      case 'notContains':
        return valueLowerCase.indexOf(filterTextLowerCase) === -1;
      default:
        console.warn('invalid filter type ' + filter);
        return false;
    }
  }

  // Actions
  private onRowDoubleClicked($event) {
    const pathToConceptDetail = `/transaction/${$event.node.data._id}`;

    this.router.navigate([pathToConceptDetail]);
  }

  private onClickAddButton() {
    const pathToTransactionDetail = `/transaction/-1`;

    this.router.navigate([pathToTransactionDetail]);
  }

  private onClickRefreshButton() {
    this.getTransactions();
  }

  private onClickEditButton() {
    const me = this,
          selectedRow = this.gridOptions.api.getSelectedRows()[0];
    let pathToDetail;

    if (selectedRow) {
      pathToDetail = `/transaction/${selectedRow._id}`;
      me.router.navigate([pathToDetail]);
    } else {
      me.toastr.warning('No row was selected to edit.');
    }
  }

  private selectAllRows() {
      this.gridOptions.api.selectAll();
  }

  // Private Methods
  private getTransactions(): void {
    const me = this;

    me.transactionService.getTransactions(me.globals.userNameLogged)
      .subscribe(transactions => {
        me.rowData = transactions;
      });
  }

}
