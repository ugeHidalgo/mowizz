import { Component, OnInit, ViewContainerRef, OnChanges, HostBinding, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../guards/pending-changes.guard';
import { DatePipe } from '@angular/common';

import { Concept } from '../../../../models/concept';
import { TransactionTypes, TransactionType } from '../../../../models/transactionType';
import { ConceptService } from '../../../../services/concept/concept.service';
import { GlobalsService } from '../../../../globals/globals.service';

import { slideInDownAnimation } from '../../../../animations';
import { SuccessDialogComponent } from '../../../dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-concept-detail',
  templateUrl: './concept-detail.component.html',
  styleUrls: ['./concept-detail.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class ConceptDetailComponent implements OnInit, OnChanges, ComponentCanDeactivate {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  @ViewChild(SuccessDialogComponent) public successDialog: SuccessDialogComponent;
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent;

  concept: Concept;
  validatingForm: FormGroup;
  transactionTypes: TransactionType[] = TransactionTypes;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private conceptService: ConceptService,
    private fb: FormBuilder) {
      const me = this;

      me.createForm();
   }

  ngOnInit() {
    const me = this,
      id = me.route.snapshot.paramMap.get('id');

    if (id === '-1') {
      me.concept = new Concept();
      me.concept.transactionType = 2; // Expense
      me.concept.created = new Date();
      me.concept.updated = new Date();
      me.concept.username = me.globals.userNameLogged;
      me.concept.active = true;
      me.rebuildForm();
    } else {
      me.getConceptById(id);
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

    me.concept = this.getFormData();
    me.conceptService.updateConcept(me.concept)
      .subscribe( (updated) => {
          if (updated) {
            me.successDialog.showModal('Guardado', 'Concepto guardado correctamente.');
            me.rebuildForm();
          } else {
            me.errorDialog.showModal('Error', 'No se puedo salvar. Inténtelo de nuevo.');
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
      active: me.concept.active,
      created: datePipe.transform(me.concept.created, format),
      updated: datePipe.transform(me.concept.updated, format),
      name: me.concept.name,
      description: me.concept.description,
      transactionType: me.concept.transactionType,
      comments: me.concept.comments
    });
  }

  getFormData(): Concept {
    const me = this,
          formModel = me.validatingForm.value,
          newConcept: Concept = me.concept;

    newConcept.active = formModel.active;
    newConcept.updated = new Date();
    newConcept.name = formModel.name;
    newConcept.description = formModel.description;
    newConcept.transactionType = formModel.transactionType;
    newConcept.comments = formModel.comments;

    return newConcept;
  }

  // Private Methods
  getConceptById(id: string): void {
    const me = this;

    me.conceptService.getConceptById(id)
      .subscribe( concept => {
          me.concept = concept[0];
          me.rebuildForm();
      });
  }
}
