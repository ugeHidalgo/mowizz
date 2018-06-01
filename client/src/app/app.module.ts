import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// External libraries
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr'; // Toaster library used to messaging
import { ToastrCustomOptions } from './messages/toastrCustomOptions';
import { AgGridModule } from 'ag-grid-angular/main'; // AgGrid component library
import { MDBBootstrapModule } from 'angular-bootstrap-md'; // MDBootstrap: Used for modals.
import { AppMaterialsModule } from './app-modules/app-materials.module'; // Angular material design components https://material.angular.io/

// App modules
import { AppRoutingModule } from './app-modules/app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/main/not-found/not-found.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { PendingChangesGuard } from './guards/pending-changes.guard';

// Services
import { UserService } from './services/user/user.service';
import { AccountService } from './services/account/account.service';
import { MessageService } from './services/message/message.service';
import { GlobalsService } from './globals/globals.service';
import { CostCentreService } from './services/costcentre/costcentre.service';
import { ConceptService } from './services/concept/concept.service';
import { TransactionService } from './services/transaction/transaction.service';


// App components
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { UserComponent } from './login/user/user.component';
import { MessagesComponent } from './messages/messages.component';
import { MatCheckboxComponent } from './components/grid/checkbox/mat-checkbox.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './components/main/account/accounts/accounts.component';
import { AccountDetailComponent } from './components/main/account/account-detail/account-detail.component';
import { CostCentresComponent } from './components/main/costcentre/costcentres/costcentres.component';
import { CostCentreDetailComponent } from './components/main/costcentre/costcentre-detail/costcentre-detail.component';
import { ConceptsComponent } from './components/main/concept/concepts/concepts.component';
import { ConceptDetailComponent } from './components/main/concept/concept-detail/concept-detail.component';
import { TransactionsComponent } from './components/main/transaction/transactions/transactions.component';
import { TransactionDetailComponent } from './components/main/transaction/transaction-detail/transaction-detail.component';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { SuccessDialogComponent } from './components/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './components/dialogs/error-dialog/error-dialog.component';
import { AccountsPanelComponent } from './components/dashboard/accounts-panel/accounts-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MessagesComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AccountsComponent,
    AccountDetailComponent,
    CostCentresComponent,
    CostCentreDetailComponent,
    MatCheckboxComponent,
    UserComponent,
    ConceptsComponent,
    ConceptDetailComponent,
    TransactionsComponent,
    TransactionDetailComponent,
    DeleteDialogComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    AccountsPanelComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    AppMaterialsModule,
    AgGridModule.withComponents([MatCheckboxComponent])
  ],

  providers: [
    AuthGuard,
    PendingChangesGuard,
    UserService,
    AccountService,
    CostCentreService,
    ConceptService,
    TransactionService,
    MessageService,
    {provide: ToastOptions, useClass: ToastrCustomOptions },
    GlobalsService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
