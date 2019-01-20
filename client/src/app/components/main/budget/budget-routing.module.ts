import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';
import { PendingChangesGuard } from '../../../guards/pending-changes.guard';

import { BudgetsComponent } from './creator/budgets/budgets.component';
import { BudgetDetailComponent } from './creator/budget-detail/budget-detail.component';

const budgetRoutes: Routes = [
    { path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard]},
    { path: 'budget/:id', component: BudgetDetailComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(budgetRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BudgetRoutingModule { }