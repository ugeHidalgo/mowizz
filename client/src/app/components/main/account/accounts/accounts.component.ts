import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AccountService } from '../../../../services/account/account.service';
import { ToastsManager } from 'ng2-toastr';
import { GridOptions } from 'ag-grid/main';
import { GlobalsService } from '../../../../globals/globals.service';

import { MatCheckboxComponent } from '../../../grid/checkbox/mat-checkbox.component';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})

export class AccountsComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(
    private router: Router,
    protected globals: GlobalsService,
    private accountService: AccountService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) {

    this.toastr.setRootViewContainerRef(vcr);
    this.getAccounts();

    this.gridOptions = <GridOptions>{};
    this.columnDefs = [
        { headerName: 'On', field: 'active', width: 20, cellRenderer: 'checkboxRenderer' },
        { headerName: 'On', field: 'active', width: 20, valueFormatter: this.booleanFormatter },
        { headerName: 'Name', field: 'name', width: 50 },
        { headerName: 'Description', field: 'description', width: 120 },
        { headerName: 'IBAN', field: 'iban', width: 150 },
        { headerName: 'Comments', field: 'comments' }
    ];
    this.frameworkComponents = {
        checkboxRenderer: MatCheckboxComponent
    };
  }

  onGridReady(params) {
      params.api.sizeColumnsToFit();
  }

  // Actions
  private onRowDoubleClicked($event) {
    const pathToAccountDetail = `/account/${$event.node.data._id}`;

    this.router.navigate([pathToAccountDetail]);
  }

  private onClickAddButton() {
    const pathToAccountDetail = `/account/-1`;

    this.router.navigate([pathToAccountDetail]);
  }

  private onClickRefreshButton() {
    this.getAccounts();
  }

  private selectAllRows() {
      this.gridOptions.api.selectAll();
  }

  // Private Methods
  private getAccounts(): void {
    const me = this;

    me.accountService.getAccounts(me.globals.userNameLogged)
      .subscribe(accounts => {
        me.rowData = accounts;
      });
  }

  private booleanFormatter(row) {
    return (row.data.active === true) ? 'X' : '';
  }
}
