import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../auth/auth.guard';
import { CostCentresComponent } from './costcentres/costcentres.component';
import { CostCentreDetailComponent } from './costcentre-detail/costcentre-detail.component';

const costCentresRoutes: Routes = [
  { path: 'costcentres', component: CostCentresComponent, canActivate: [AuthGuard]},
  { path: 'costcentre/:id', component: CostCentreDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(costCentresRoutes)
  ],

  exports: [
    RouterModule
  ]
})

export class CostCentresRoutingModule { }
