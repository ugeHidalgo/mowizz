import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';
import { PendingChangesGuard } from '../../../guards/pending-changes.guard';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

const conceptsRoutes: Routes = [
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]},
  { path: 'transaction/:id', component: TransactionDetailComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] }
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
