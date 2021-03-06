import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { PageNotFoundComponent } from '../components/main/not-found/not-found.component';

// Routing Modules
import { LoginRoutingModule } from '../login/login-routing.module';
import { AccountsRoutingModule } from '../components/main/account/account-routing.module';
import { CostCentresRoutingModule } from '../components/main/costcentre/costcentres-routing.module';
import { ConceptsRoutingModule } from '../components/main/concept/concepts-routing.module';
import { TransactionsRoutingModule } from '../components/main/transaction/transactions-routing.module';
import { BudgetRoutingModule } from '../components/main/budget/budget-routing.module';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    AccountsRoutingModule,
    CostCentresRoutingModule,
    ConceptsRoutingModule,
    TransactionsRoutingModule,
    BudgetRoutingModule,
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
