import { Component, OnInit, ViewContainerRef, OnChanges, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';
import { CostCentre } from '../../../../models/costcentre';
import { CostCentreService } from '../../../../services/costcentre/costcentre.service';
import { GlobalsService } from '../../../../globals/globals.service';

import { slideInDownAnimation } from '../../../../animations';

@Component({
  selector: 'app-costcentre-detail',
  templateUrl: './costcentre-detail.component.html',
  styleUrls: ['./costcentre-detail.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class CostCentreDetailComponent implements OnInit, OnChanges {

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
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      const me = this;

      me.toastr.setRootViewContainerRef(vcr);
      me.createForm();
   }

  ngOnInit() {
    const me = this,
      id = me.route.snapshot.paramMap.get('id');

    if (id === '-1') {
      me.costCentre = new CostCentre();
      me.costCentre.username = me.globals.userNameLogged;
    } else {
      me.getCostCentreById(id);
    }
  }

  ngOnChanges() {
    this.rebuildForm();
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
      .subscribe( () => {
          me.toastr.success('Successfully saved.');
        }
      );
    me.rebuildForm();
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = me.fb.group({
      active: '',
      name: [ '', Validators.required ],
      description: '',
      comments: ''
    });
  }

  rebuildForm() {
    const me = this;

    me.validatingForm.reset({
      active: me.costCentre.active,
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
