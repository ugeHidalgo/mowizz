import { Component, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ConceptService } from '../../../../services/concept/concept.service';
import { ToastsManager } from 'ng2-toastr';
import { GridOptions } from 'ag-grid/main';
import { GlobalsService } from '../../../../globals/globals.service';

import { MatCheckboxComponent } from '../../../grid/checkbox/mat-checkbox.component';
import { TransactionTypes } from '../../../../models/transactionType';

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
      rowSelection: 'single',
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      floatingFilter: true,
      columnDefs: [
        { headerName: 'Activo', field: 'active', width: 30, cellRenderer: 'checkboxRenderer', suppressFilter: true  },
        { headerName: 'Tipo', field: 'transactionType', type: 'transactionTypeColumn' },
        { headerName: 'Nombre', field: 'name', type: 'textColumn' },
        { headerName: 'Descripción', field: 'description', type: 'textColumn', width: 120 },
        { headerName: 'Commentarios', field: 'comments', suppressFilter: true  }
      ],
      columnTypes: {
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
        }
      },
      frameworkComponents: {
        checkboxRenderer: MatCheckboxComponent
      }
    };
  }

  onGridReady(params) {
      params.api.sizeColumnsToFit();
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

