import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';
import { PendingChangesGuard } from '../../../guards/pending-changes.guard';

import { TransactionsComponent } from './transactions/transactions.component';

const conceptsRoutes: Routes = [
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(conceptsRoutes)
  ],

  exports: [
    RouterModule
  ]
})

export class TransactionsRoutingModule { }
