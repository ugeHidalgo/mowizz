import { Component, OnInit, ViewContainerRef, OnChanges, HostBinding, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../guards/pending-changes.guard';

import { ToastsManager } from 'ng2-toastr';
import { Account } from '../../../../models/account';
import { AccountService } from '../../../../services/account/account.service';
import { GlobalsService } from '../../../../globals/globals.service';

import { slideInDownAnimation } from '../../../../animations';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class AccountDetailComponent implements OnInit, OnChanges, ComponentCanDeactivate {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  account: Account;
  validatingForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private accountService: AccountService,
    private fb: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      const me = this;

      me.toastr.setRootViewContainerRef(vcr);
      me.createForm();
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

  ngOnChanges() {
    this.rebuildForm();
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.validatingForm.pristine;
  }

  // Buttons actions
  onClickGoBack() {
    this.location.back();
  }

  onClickRefresh() {
    this.rebuildForm();
  }

  onClickSave(): void {
    const me = this;

    me.account = this.getFormData();
    me.accountService.updateAccount(me.account)
      .subscribe( () => {
          me.toastr.success('Successfully saved.');
        }
      );
    me.rebuildForm();
  }

  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = me.fb.group({
      active: '',
      name: [ '', Validators.required ],
      description: '',
      iban: '',
      comments: ''
    });
  }

  rebuildForm() {
    const me = this;

    me.validatingForm.reset({
      active: me.account.active,
      name: me.account.name,
      description: me.account.description,
      iban: me.account.iban,
      comments: me.account.comments
    });
  }

  getFormData(): Account {
    const me = this,
          formModel = me.validatingForm.value,
          newAccount: Account = me.account;

    newAccount.active = formModel.active;
    newAccount.name = formModel.name;
    newAccount.description = formModel.description;
    newAccount.iban = formModel.iban;
    newAccount.comments = formModel.comments;

    return newAccount;
  }

  // Private Methods
  getAccountById(id: string): void {
    const me = this;

    me.accountService.getAccountById(id)
      .subscribe( account => {
          me.account = account[0];
          me.rebuildForm();
      });
  }

}
