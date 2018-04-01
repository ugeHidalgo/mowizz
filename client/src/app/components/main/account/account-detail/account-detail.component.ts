import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';
import { Account } from '../../../../models/account';
import { AccountService } from '../../../../services/account/account.service';
import { GlobalsService } from '../../../../globals/globals.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  account: Account;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private accountService: AccountService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    const me = this,
      id = me.route.snapshot.paramMap.get('id');

    if (id === '-1') {
      me.account = new Account();
      me.account.username = me.globals.userNameLogged;
    } else {
      me.getAccountById(id);
    }
  }

  getAccountById(id: string): void {
    const me = this;

    me.accountService.getAccountById(id)
      .subscribe( account => {
          me.account = account[0];
      });
  }

  // Buttons actions

  onClickGoBack() {
    this.location.back();
  }

  onClickSave(): void {
    const me = this;

    me.accountService.updateAccount(me.account)
      .subscribe( () => {
          me.toastr.success('Successfully saved.', 'Saved!');
          me.location.back();
        }
      );
  }

}
