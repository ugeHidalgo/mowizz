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

    this.toastr.setRootViewContainerRef(vcr);
    this.getConcepts();

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

