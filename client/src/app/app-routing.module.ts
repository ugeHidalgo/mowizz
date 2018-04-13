import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/main/not-found/not-found.component';

import { HeroesComponent } from './heroes/heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { AccountsRoutingModule } from './components/main/account/account-routing.module';
import { CostCentresRoutingModule } from './components/main/costcentres/costcentres-routing.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule,
    CostCentresRoutingModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
