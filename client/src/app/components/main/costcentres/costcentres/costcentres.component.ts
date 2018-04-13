import { Component, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { CostCentreService } from '../../../../services/costcentre/costcentre.service';
import { ToastsManager } from 'ng2-toastr';
import { GridOptions } from 'ag-grid/main';
import { GlobalsService } from '../../../../globals/globals.service';

import { MatCheckboxComponent } from '../../../grid/checkbox/mat-checkbox.component';

@Component({
  selector: 'app-costcentres',
  templateUrl: './costcentres.component.html',
  styleUrls: ['./costcentres.component.scss']
})
export class CostCentresComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(
    private router: Router,
    protected globals: GlobalsService,
    private costCentreService: CostCentreService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) {

    this.toastr.setRootViewContainerRef(vcr);
    this.getCostCentres();

    this.gridOptions = <GridOptions>{};
    this.columnDefs = [
        { headerName: 'On', field: 'active', width: 30, cellRenderer: 'checkboxRenderer' },
        { headerName: 'Name', field: 'name', width: 50 },
        { headerName: 'Description', field: 'description', width: 120 },
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
    const pathToAccountDetail = `/costcentre/${$event.node.data._id}`;

    this.router.navigate([pathToAccountDetail]);
  }

  private onClickAddButton() {
    const pathToAccountDetail = `/costcentre/-1`;

    this.router.navigate([pathToAccountDetail]);
  }

  private onClickRefreshButton() {
    this.getCostCentres();
  }

  private selectAllRows() {
      this.gridOptions.api.selectAll();
  }

  // Private Methods
  private getCostCentres(): void {
    const me = this;

    me.costCentreService.getCostCentres(me.globals.userNameLogged)
      .subscribe(costCentres => {
        me.rowData = costCentres;
      });
  }
}
