import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';

import { HeroesComponent } from './heroes/heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { AccountsComponent } from './components/main/account/accounts/accounts.component';
import { AccountDetailComponent } from './components/main/account/account-detail/account-detail.component';
import { CostCentresComponent } from './components/main/costcentres/costcentres/costcentres.component';
import { CostCentreDetailComponent } from './components/main/costcentres/costcentre-detail/costcentre-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
  { path: 'account/:id', component: AccountDetailComponent, canActivate: [AuthGuard] },
  { path: 'costcentres', component: CostCentresComponent, canActivate: [AuthGuard]},
  { path: 'costcentre/:id', component: CostCentreDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
