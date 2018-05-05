import { Component, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
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
        rowSelection: 'single'
      };
      me.columnDefs = [
          { headerName: 'Date', field: 'date', width: 30, valueFormatter: me.dateFormatter },
          { headerName: 'Type', field: 'transactionType', width: 25, valueFormatter: me.transactionTypeFormatter},
          { headerName: 'Amount', field: 'amount', width: 25 },
          { headerName: 'Concept', field: 'concept', width: 40, valueFormatter: me.conceptFormatter },
          { headerName: 'Comments', field: 'comments' }
      ];
  }

  onGridReady(params) {
      params.api.sizeColumnsToFit();
  }

  dateFormatter(params) {
    const me = this,
          datePipe = new DatePipe(navigator.language),
          format = 'dd/MM/yyyy';

    return datePipe.transform(params.value, format);
  }

  transactionTypeFormatter(params) {
    const transactionType = TransactionTypes.find(function(x) { return x.value === params.value; });
    return transactionType.name;
  }

  conceptFormatter(params) {
    return params.value.name;
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
