import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';
import { PendingChangesGuard } from './../../../guards/pending-changes.guard';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const accountsRoutes: Routes = [
    { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
    { path: 'account/:id', component: AccountDetailComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(accountsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountsRoutingModule { }
