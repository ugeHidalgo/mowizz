import { Component, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ConceptService } from '../../../../services/concept/concept.service';
import { ToastsManager } from 'ng2-toastr';
import { GridOptions } from 'ag-grid/main';
import { GlobalsService } from '../../../../globals/globals.service';

import { MatCheckboxComponent } from '../../../grid/checkbox/mat-checkbox.component';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styleUrls: ['./concepts.component.scss']
})
export class ConceptsComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(
    private router: Router,
    protected globals: GlobalsService,
    private conceptService: ConceptService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) {
      const me = this;

    me.toastr.setRootViewContainerRef(vcr);
    me.getConcepts();

    me.gridOptions = <GridOptions>{
      rowSelection: 'single'
    };
    me.columnDefs = [
        { headerName: 'Activo', field: 'active', width: 30, cellRenderer: 'checkboxRenderer' },
        { headerName: 'Tipo', field: 'transactionType', width: 25 },
        { headerName: 'Nombre', field: 'name', width: 50 },
        { headerName: 'Descripción', field: 'description', width: 120 },
        { headerName: 'Commentarios', field: 'comments' }
    ];
    me.frameworkComponents = {
      checkboxRenderer: MatCheckboxComponent
  };
  }

  onGridReady(params) {
      params.api.sizeColumnsToFit();
  }

  // Actions
  private onRowDoubleClicked($event) {
    const pathToConceptDetail = `/concept/${$event.node.data._id}`;

    this.router.navigate([pathToConceptDetail]);
  }

  private onClickAddButton() {
    const pathToConceptDetail = `/concept/-1`;

    this.router.navigate([pathToConceptDetail]);
  }

  private onClickRefreshButton() {
    this.getConcepts();
  }

  private onClickEditButton() {
    const me = this,
          selectedRow = this.gridOptions.api.getSelectedRows()[0];
    let pathToDetail;

    if (selectedRow) {
      pathToDetail = `/concept/${selectedRow._id}`;
      me.router.navigate([pathToDetail]);
    } else {
      me.toastr.warning('No row was selected to edit.');
    }
  }

  private selectAllRows() {
      this.gridOptions.api.selectAll();
  }

  // Private Methods
  private getConcepts(): void {
    const me = this;

    me.conceptService.getConcepts(me.globals.userNameLogged)
      .subscribe(concepts => {
        me.rowData = concepts;
      });
  }
}

