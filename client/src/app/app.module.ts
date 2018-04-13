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
import { MDBBootstrapModule } from 'angular-bootstrap-md'; // MDBootstrap
import { MatCheckboxModule } from '@angular/material'; // Angular material desing components https://material.angular.io/

// App modules
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { PendingChangesGuard } from './guards/pending-changes.guard';

// Services
import { UserService } from './services/user/user.service';
import { AccountService } from './services/account/account.service';
import { MessageService } from './services/message/message.service';
import { GlobalsService } from './globals/globals.service';

// App components
import { MessagesComponent } from './messages/messages.component';
import { AccountsComponent } from './components/main/account/accounts/accounts.component';
import { AccountDetailComponent } from './components/main/account/account-detail/account-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { CostCentresComponent } from './components/main/costcentres/costcentres/costcentres.component';
import { CostCentreService } from './services/costcentre/costcentre.service';
import { CostCentreDetailComponent } from './components/main/costcentres/costcentre-detail/costcentre-detail.component';
import { MatCheckboxComponent } from './components/grid/checkbox/mat-checkbox.component';
import { PageNotFoundComponent } from './components/main/not-found/not-found.component';


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
    MatCheckboxComponent
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
    MatCheckboxModule,
    AgGridModule.withComponents([MatCheckboxComponent])
  ],

  providers: [
    AuthGuard,
    PendingChangesGuard,
    UserService,
    AccountService,
    CostCentreService,
    MessageService,
    {provide: ToastOptions, useClass: ToastrCustomOptions },
    GlobalsService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
