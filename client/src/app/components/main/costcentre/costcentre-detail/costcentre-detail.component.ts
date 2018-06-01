import { Component, OnInit, ViewContainerRef, OnChanges, HostBinding, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Location, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../guards/pending-changes.guard';

import { CostCentre } from '../../../../models/costcentre';
import { CostCentreService } from '../../../../services/costcentre/costcentre.service';
import { GlobalsService } from '../../../../globals/globals.service';

import { slideInDownAnimation } from '../../../../animations';
import { SuccessDialogComponent } from '../../../dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../dialogs/error-dialog/error-dialog.component';

@Component({
  selector: 'app-costcentre-detail',
  templateUrl: './costcentre-detail.component.html',
  styleUrls: ['./costcentre-detail.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class CostCentreDetailComponent implements OnInit, OnChanges, ComponentCanDeactivate {

  @ViewChild(SuccessDialogComponent) public successDialog: SuccessDialogComponent;
  @ViewChild(ErrorDialogComponent) public errorDialog: ErrorDialogComponent;

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  costCentre: CostCentre;
  validatingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private costCentreService: CostCentreService,
    private fb: FormBuilder) {
      const me = this;

      me.createForm();
   }

  ngOnInit() {
    const me = this,
      id = me.route.snapshot.paramMap.get('id');

    if (id === '-1') {
      me.costCentre = new CostCentre();
      me.costCentre.created = new Date();
      me.costCentre.updated = new Date();
      me.costCentre.username = me.globals.userNameLogged;
      me.costCentre.active = true;

    } else {
      me.getCostCentreById(id);
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

    me.costCentre = this.getFormData();
    me.costCentreService.updateCostCentre(me.costCentre)
      .subscribe( (updated) => {
          if (updated) {
            me.successDialog.showModal('Guardado', 'Centro de coste guardado correctamente.');
          } else {
            me.errorDialog.showModal('Error', 'No se pudo borrar el movimiento. Inténtelo de nuevo.');
          }
        }
      );
    me.rebuildForm();
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = me.fb.group({
      active: '',
      created: '',
      updated: '',
      name: [ '', [Validators.required] ],
      description: '',
      comments: ''
    });
  }

  rebuildForm() {
    const me = this,
          datePipe = new DatePipe(navigator.language),
          format = 'dd/MM/yyyy';

    me.validatingForm.reset({
      active: me.costCentre.active,
      created: datePipe.transform(me.costCentre.created, format),
      updated: datePipe.transform(me.costCentre.updated, format),
      name: me.costCentre.name,
      description: me.costCentre.description,
      comments: me.costCentre.comments
    });
  }

  getFormData(): CostCentre {
    const me = this,
          formModel = me.validatingForm.value,
          newCostCentre: CostCentre = me.costCentre;

    newCostCentre.active = formModel.active;
    newCostCentre.name = formModel.name;
    newCostCentre.description = formModel.description;
    newCostCentre.comments = formModel.comments;

    return newCostCentre;
  }

  // Private Methods
  getCostCentreById(id: string): void {
    const me = this;

    me.costCentreService.getCostCentreById(id)
      .subscribe( costCentre => {
          me.costCentre = costCentre[0];
          me.rebuildForm();
      });
  }
}
