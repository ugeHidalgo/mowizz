import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';

import { BudgetsComponent } from './creator/budgets/budgets.component';

const budgetRoutes: Routes = [
    { path: 'budgets', component: BudgetsComponent, canActivate: [AuthGuard]}
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