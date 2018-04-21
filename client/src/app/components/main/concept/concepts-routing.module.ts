import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';
import { PendingChangesGuard } from '../../../guards/pending-changes.guard';

import { ConceptComponent } from './concepts/concept.component';
import { ConceptDetailComponent } from './concept-detail/concept-detail.component';

const conceptsRoutes: Routes = [
  { path: 'concepts', component: ConceptComponent, canActivate: [AuthGuard]},
  { path: 'costcentre/:id', component: ConceptDetailComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(conceptsRoutes)
  ],

  exports: [
    RouterModule
  ]
})

export class ConceptsRoutingModule { }
