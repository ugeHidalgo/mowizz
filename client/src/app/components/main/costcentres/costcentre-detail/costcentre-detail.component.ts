import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';
import { CostCentre } from '../../../../models/costcentre';
import { CostCentreService } from '../../../../services/costcentre/costcentre.service';
import { GlobalsService } from '../../../../globals/globals.service';

@Component({
  selector: 'app-costcentre-detail',
  templateUrl: './costcentre-detail.component.html',
  styleUrls: ['./costcentre-detail.component.scss']
})
export class CostCentreDetailComponent implements OnInit {
  costCentre: CostCentre;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private costCentreService: CostCentreService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
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

  getCostCentreById(id: string): void {
    const me = this;

    me.costCentreService.getCostCentreById(id)
      .subscribe( costCentre => {
          me.costCentre = costCentre[0];
      });
  }

  // Buttons actions

  onClickGoBack() {
    this.location.back();
  }

  onClickSave(): void {
    const me = this;

    me.costCentreService.updateCostCentre(me.costCentre)
      .subscribe( () => {
          me.toastr.success('Successfully saved.', 'Saved!');
          me.location.back();
        }
      );
  }

}
