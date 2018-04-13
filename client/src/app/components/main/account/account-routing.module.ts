import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../../auth/auth.guard';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const accountsRoutes: Routes = [
    { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
    { path: 'account/:id', component: AccountDetailComponent, canActivate: [AuthGuard] },
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
