import { Component, ViewContainerRef } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { BudgetService } from '../../../../../services/budget/budget.service';
import { ToastsManager } from 'ng2-toastr';
import { GridOptions } from 'ag-grid/main';
import { GlobalsService } from '../../../../../globals/globals.service';

import { MatCheckboxComponent } from '../../../../grid/checkbox/mat-checkbox.component';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss']
})
export class BudgetsComponent {

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];
  frameworkComponents: any;

  constructor(
    private router: Router,
    protected globals: GlobalsService,
    private budgetService: BudgetService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef ) {
      const me = this;

    me.toastr.setRootViewContainerRef(vcr);
    me.getBudgets();

    me.gridOptions = <GridOptions>{
      rowSelection: 'single',
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      floatingFilter: true,
      columnDefs: [
        { headerName: 'En uso', field: 'active', width: 30, cellRenderer: 'checkboxRenderer', suppressFilter: true  },
        { headerName: 'Nombre', field: 'name', type: 'textColumn' },
        { headerName: 'Descripción', field: 'description', type: 'textColumn', width: 120 },
        { headerName: 'Inicio', field: 'startDate', type: 'dateColumn' },
        { headerName: 'Fin', field: 'endDate', type: 'dateColumn' },
        { headerName: 'Total', field: 'amount', type: ['numericColumn', 'numberColumn'] }
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
        dateColumn: {
          width: 55,
          valueFormatter: me.dateFormatter,
          filter: 'agDateColumnFilter',
          filterParams: {
              comparator: me.dateComparator
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

  // Actions
  private onRowDoubleClicked($event) {
    const pathToBudgetDetail = `/budget/${$event.node.data._id}`;

    this.router.navigate([pathToBudgetDetail]);
  }

  private onClickAddButton() {
    const pathToBudgetDetail = `/budgett/-1`;

    this.router.navigate([pathToBudgetDetail]);
  }

  private onClickRefreshButton() {
    this.getBudgets();
  }

  private onClickEditButton() {
    const me = this,
          selectedRow = this.gridOptions.api.getSelectedRows()[0];
    let pathToDetail;

    if (selectedRow) {
      pathToDetail = `/budget/${selectedRow._id}`;
      me.router.navigate([pathToDetail]);
    } else {
      me.toastr.warning('No row was selected to edit.');
    }
  }

  // Private Methods
  private selectAllRows() {
      this.gridOptions.api.selectAll();
  }

  private getBudgets(): void {
    const me = this;

    me.budgetService.getActiveBudgets(me.globals.userNameLogged)
      .subscribe(data => {
        me.rowData = data;
      });
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

}
