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
      const me = this;

    me.toastr.setRootViewContainerRef(vcr);
    me.getAccounts();

    me.gridOptions = <GridOptions>{
      rowSelection: 'single',
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      floatingFilter: true,
      columnDefs: [
        { headerName: 'Activo', field: 'active', width: 35, cellRenderer: 'checkboxRenderer', suppressFilter: true },
        { headerName: 'Cantidad', field: 'amount', type: ['numericColumn', 'numberColumn'] },
        { headerName: 'Nombre', field: 'name', type: 'textColumn' },
        { headerName: 'Descripción', field: 'description', type: 'textColumn', width: 120 },
        { headerName: 'IBAN', field: 'iban', width: 150, suppressFilter: true },
        { headerName: 'Commentarios', field: 'comments', suppressFilter: true }
      ],
      columnTypes: {
        numberColumn: {
          width: 50,
          filter: 'agNumberColumnFilter'
        },
        textColumn: {
          width: 50,
          filter: 'agTextColumnFilter'
        }
      }
    };

    me.frameworkComponents = {
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

  private onClickEditButton() {
    const me = this,
          selectedRow = this.gridOptions.api.getSelectedRows()[0];
    let pathToDetail;

    if (selectedRow) {
      pathToDetail = `/account/${selectedRow._id}`;
      me.router.navigate([pathToDetail]);
    } else {
      me.toastr.warning('No row was selected to edit.');
    }
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
}
