import { Component, HostBinding } from '@angular/core';
import { GlobalsService } from '../globals/globals.service';
/* import { GridOptions } from 'ag-grid';
import { Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { CurrencyPipe } from '@angular/common'; */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(protected globals: GlobalsService) {}
}
