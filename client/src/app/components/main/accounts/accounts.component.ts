import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Account } from '../../../models/account';
import { AccountService } from '../../../services/account/account.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];

  constructor(private accountService: AccountService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(): void {
    const me = this;

    me.accountService.getAccounts()
      .subscribe(accounts => {
        me.accounts = accounts;
      });
  }

}
