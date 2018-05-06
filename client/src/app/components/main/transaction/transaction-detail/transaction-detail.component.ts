import { Component, OnInit, ViewContainerRef, OnChanges, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Location, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../guards/pending-changes.guard';
import { slideInDownAnimation } from '../../../../animations';
import { ToastsManager } from 'ng2-toastr';

import { Transaction } from '../../../../models/transaction';
import { TransactionTypes, TransactionType } from '../../../../models/transactionType';
import { Concept } from '../../../../models/concept';
import { CostCentre } from '../../../../models/costcentre';
import { Account } from '../../../../models/account';

import { GlobalsService } from '../../../../globals/globals.service';
import { TransactionService } from '../../../../services/transaction/transaction.service';
import { ConceptService } from '../../../../services/concept/concept.service';
import { CostCentreService } from '../../../../services/costcentre/costcentre.service';
import { AccountService } from '../../../../services/account/account.service';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class TransactionDetailComponent implements OnInit, OnChanges, ComponentCanDeactivate {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  transaction: Transaction;
  validatingForm: FormGroup;
  transactionTypes: TransactionType[] = TransactionTypes;
  concepts: Concept[];
  costCentres: CostCentre[];
  accounts: Account[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private transactionService: TransactionService,
    private conceptService: ConceptService,
    private costCentreService: CostCentreService,
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

    me.getActiveConcepts();
    me.getActiveCostCentres();
    me.getActiveAccounts();

    if (id === '-1') {
      me.transaction = new Transaction();
      me.transaction.username = me.globals.userNameLogged;
      me.transaction.transactionType = 2; // Expense
      me.transaction.concept = new Concept();
      me.transaction.costCentre = new CostCentre();
      me.transaction.account = new Account();
      me.transaction.date = new Date();
      me.transaction.amount = 0;
      me.rebuildForm();
    } else {
      me.getTransactionById(id);
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

    me.transaction = this.getFormData();
    me.transactionService.updatetransaction(me.transaction)
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
      date: '',
      transactionType: '',
      concept: '',
      costCentre: '',
      account: '',
      comments: '',
      amount: ''
    });
  }

  rebuildForm() {
    const me = this;

    me.validatingForm.reset({
      date: me.transaction.date,
      transactionType: me.transaction.transactionType,
      concept: me.transaction.concept._id,
      costCentre: me.transaction.costCentre._id,
      account: me.transaction.account._id,
      comments: me.transaction.comments,
      amount: me.transaction.amount
    });
  }

  getFormData(): Transaction {
    const me = this,
          formModel = me.validatingForm.value,
          newTransaction: Transaction = me.transaction;

    newTransaction.date = formModel.date;
    newTransaction.transactionType = formModel.transactionType;
    newTransaction.concept = me.getConceptById(formModel.concept);
    newTransaction.costCentre = me.getCostCentreById(formModel.costCentre);
    newTransaction.account = me.getAccountById(formModel.account);
    newTransaction.comments = formModel.comments;
    newTransaction.amount = formModel.amount;

    return newTransaction;
  }

  // Private Methods
  getTransactionById(id: string): void {
    const me = this;

    me.transactionService.getTransactionById(id)
      .subscribe( transaction => {
          me.transaction = transaction[0];
          me.rebuildForm();
      });
  }

  getActiveConcepts(): void {
    const me = this,
          username = me.globals.userNameLogged;

    me.conceptService.getActiveConcepts(username)
      .subscribe( concepts => {
          me.concepts = concepts;
      });
  }

  getConceptById(id): Concept {
    return this.concepts.find( function(x) { return x._id === id; });
  }

  getActiveCostCentres(): void {
    const me = this,
          username = me.globals.userNameLogged;

    me.costCentreService.getActiveCostCentres(username)
      .subscribe( costCentres => {
          me.costCentres = costCentres;
      });
  }

  getCostCentreById(id): CostCentre {
    return this.costCentres.find( function(x) { return x._id === id; });
  }

  getActiveAccounts(): void {
    const me = this,
          username = me.globals.userNameLogged;

    me.accountService.getActiveAccounts(username)
      .subscribe( accounts => {
          me.accounts = accounts;
      });
  }

  getAccountById(id): Account {
    return this.accounts.find( function(x) { return x._id === id; });
  }
}
