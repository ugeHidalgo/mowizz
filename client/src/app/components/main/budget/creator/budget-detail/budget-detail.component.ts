import { Component, OnInit, OnChanges, HostBinding, ViewChild } from '@angular/core';
import { slideInDownAnimation } from '../../../../../animations';
import { ComponentCanDeactivate } from '../../../../../guards/pending-changes.guard';

import { SuccessDialogComponent } from '../../../../dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../../dialogs/error-dialog/error-dialog.component';

import { Budget } from '../../../../../models/budget';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../../../../../globals/globals.service';
import { BudgetService } from '../../../../../services/budget/budget.service';
import { Observable } from 'rxjs/Observable';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
  animations: [ slideInDownAnimation ]
})

export class BudgetDetailComponent implements OnInit, OnChanges, ComponentCanDeactivate {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  @ViewChild(SuccessDialogComponent) public successDialog: SuccessDialogComponent;
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent;

  budget: Budget;
  validatingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private budgetService: BudgetService,
    private fb: FormBuilder) {
      const me = this;

      me.createForm();
   }

  ngOnInit() {
    const me = this,
      id = me.route.snapshot.paramMap.get('id');

    if (id === '-1') {
      me.budget = new Budget();
      me.budget.created = new Date();
      me.budget.updated = new Date();
      me.budget.startDate = new Date();
      me.budget.endDate = new Date();
      me.budget.username = me.globals.userNameLogged;
      me.budget.active = true;
      me.rebuildForm();
    } else {
      me.getBudgetById(id);
    }
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.validatingForm.pristine;
  }

  // Buttons actions
  onClickGoBack() {
    this.location.back();
  }

  onClickRefresh() {
    this.rebuildForm();
  }

  onClickSave(): void {
    const me = this;

    me.budget = this.getFormData();
    me.budgetService.updateBudget(me.budget)
      .subscribe( (updated) => {
          if (updated) {
            me.successDialog.showModal('Guardado', 'presupuesto guardado correctamente.');
            me.rebuildForm();
          } else {
            me.errorDialog.showModal('Error', 'No se pudo salvar. Inténtelo de nuevo.');
          }
        }
      );
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = me.fb.group({
      active: '',
      created: '',
      updated: '',
      startDate: '',
      endDate: '',
      name: ['', [Validators.required ]],
      description: '',
      transactionType: '',
      comments: ''
    });
  }

  rebuildForm() {
    const me = this,
          datePipe = new DatePipe(navigator.language),
          format = 'dd/MM/yyyy';

    me.validatingForm.reset({
      active: me.budget.active,
      created: datePipe.transform(me.budget.created, format),
      updated: datePipe.transform(me.budget.updated, format),
      startDate: me.budget.startDate,
      endDate: me.budget.endDate,
      name: me.budget.name,
      description: me.budget.description,
      comments: me.budget.comments
    });
  }

  getFormData(): Budget {
    const me = this,
          formModel = me.validatingForm.value,
          newbudget: Budget = me.budget;

    newbudget.active = formModel.active;
    newbudget.updated = new Date();
    newbudget.startDate = formModel.startDate;
    newbudget.endDate = formModel.endDate;
    newbudget.name = formModel.name;
    newbudget.description = formModel.description;
    newbudget.comments = formModel.comments;

    return newbudget;
  }

  // Private Methods
  getBudgetById(id: string): void {
    const me = this;

    me.budgetService.getBudgetById(me.globals.userNameLogged, id)
      .subscribe( budget => {
          me.budget = budget[0];
          me.rebuildForm();
      });
  }

}
