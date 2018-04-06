import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// External libraries
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr'; // Toaster library used to messaging
import { ToastrCustomOptions } from './messages/toastrCustomOptions';
import { AgGridModule } from 'ag-grid-angular/main'; // AgGrid component library
import { MDBBootstrapModule } from 'angular-bootstrap-md'; // MDBootstrap

// App modules
import { AppRoutingModule } from './/app-routing.module';
import { AuthGuard } from './auth/auth.guard';

// Services
import { UserService } from './services/user/user.service';
import { AccountService } from './services/account/account.service';
import { HeroService } from './services/hero/hero.service';
import { MessageService } from './services/message/message.service';
import { GlobalsService } from './globals/globals.service';

// App components
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AccountsComponent } from './components/main/account/accounts/accounts.component';
import { AccountDetailComponent } from './components/main/account/account-detail/account-detail.component';
import { HeroesComponent } from './heroes/heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { CostCentresComponent } from './components/main/costcentres/costcentres/costcentres.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    LoginComponent,
    RegisterComponent,
    AccountsComponent,
    AccountDetailComponent,
    CostCentresComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    AgGridModule.withComponents([])
  ],

  providers: [
    AuthGuard,
    UserService,
    HeroService,
    AccountService,
    MessageService,
    {provide: ToastOptions, useClass: ToastrCustomOptions },
    GlobalsService
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
