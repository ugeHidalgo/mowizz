import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AccountService } from '../../../../services/account/account.service';
import { ToastsManager } from 'ng2-toastr';
import { GridOptions } from 'ag-grid/main';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  constructor(
    private router: Router,
    private accountService: AccountService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) {

    this.toastr.setRootViewContainerRef(vcr);
    this.getAccounts();

    this.gridOptions = <GridOptions>{};
    this.columnDefs = [
        { headerName: 'Active', field: 'active', width: 40, valueFormatter: this.booleanFormatter },
        { headerName: 'Name', field: 'name', width: 50 },
        { headerName: 'Description', field: 'description', width: 120 },
        { headerName: 'IBAN', field: 'iban', width: 150 },
        { headerName: 'Comments', field: 'comments' }
    ];
  }

  onGridReady(params) {
      params.api.sizeColumnsToFit();
  }

  private onRowDoubleClicked($event) {
    const pathToAccountDetail = `/account/${$event.node.data._id}`;

    this.router.navigate([pathToAccountDetail]);
}

  selectAllRows() {
      this.gridOptions.api.selectAll();
  }

  getAccounts(): void {
    const me = this;

    me.accountService.getAccounts()
      .subscribe(accounts => {
        me.rowData = accounts;
      });
  }

  booleanFormatter(row) {
    return (row.data.active === true) ? 'X' : '';
  }
}
