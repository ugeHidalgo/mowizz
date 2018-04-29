import { Component, OnInit, ViewContainerRef, OnChanges, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ComponentCanDeactivate } from '../../../../guards/pending-changes.guard';
import { DatePipe } from '@angular/common';

import { ToastsManager } from 'ng2-toastr';
import { Transaction } from '../../../../models/transaction';
import { TransactionTypes, TransactionType } from '../../../../models/transactionType';
import { TransactionService } from '../../../../services/transaction/transaction.service';
import { GlobalsService } from '../../../../globals/globals.service';

import { slideInDownAnimation } from '../../../../animations';

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


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    protected globals: GlobalsService,
    private transactionService: TransactionService,
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
      me.transaction = new Transaction();
      me.transaction.transactionType = 2; // Expense
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
          me.rebuildForm();
        }
      );
  }


  // FormModel methods
  createForm() {
    const me = this;

    me.validatingForm = me.fb.group({
      date: '',
      transactionType: '',
      comments: '',
      amount: 0
    });
  }

  rebuildForm() {
    const me = this,
          datePipe = new DatePipe(navigator.language),
          format = 'dd/MM/yyyy';

    me.validatingForm.reset({
      date: datePipe.transform(me.transaction.date, format),
      transactionType: me.transaction.transactionType,
      comments: me.transaction.comments,
      amount: me.transaction.amount,
    });
  }

  getFormData(): Transaction {
    const me = this,
          formModel = me.validatingForm.value,
          newTransaction: Transaction = me.transaction;

    newTransaction.date = new Date();
    newTransaction.transactionType = formModel.transactionType;
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

}
