import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../message/message.service';
import { GlobalsService } from '../../globals/globals.service';
import { Transaction } from '../../models/transaction';
import { TransactionType } from '../../models/transactionType';

@Injectable()
export class TransactionService {

  private transactionsUrl: string;
  private TransactionUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private globals: GlobalsService,
    private router: Router
  ) {
    this.transactionsUrl  = globals.server + 'api/transactions';
    this.TransactionUrl  = globals.server + 'api/transaction';
  }


  /**.*/
  getTransactions(userName: string): Observable<Transaction[]> {
    const me = this,
          getUserNameTransactionsUrl = `${me.transactionsUrl}/?username=${userName}`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Transaction[]>(getUserNameTransactionsUrl, httpOptions)
              .pipe(
                tap(Transactions => me.log('Transactions fetched.')),
                catchError(me.handleError('getTransactions', []))
              );
  }

  getTransactionsOnDates(userName: string, transactionType: TransactionType, dateFrom: Date, dateTo: Date): Observable<Transaction[]> {
    const me = this,
          getTransactionsUrl = `${me.transactionsUrl}/?username=${userName}&transtype=${transactionType.value}` +
                              `&datefrom=${dateFrom}&dateto=${dateTo}`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Transaction[]>(getTransactionsUrl, httpOptions)
              .pipe(
                tap(Transactions => me.log('Transactions fetched.')),
                catchError(me.handleError('getTransactionsOnDates', []))
              );
  }

  /**.*/
  getTransactionById(userName: string, id: string): Observable<Transaction> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          getTransactionByIdUrl = `${me.TransactionUrl}/?username=${userName}&id=${id}`,
          transaction = me.http.get<Transaction>(getTransactionByIdUrl, httpOptions)
                      .pipe(
                        tap(_ => me.log(`Transaction with id ${id} for user ${userName} was fetched.`)),
                        catchError(me.handleError<Transaction>(`getTransactionById (userName:${userName}, id:${id})`))
                      );
    return transaction;
  }

  /**.*/
  deleteTransactionById(userName: string, id: string): Observable<boolean> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          deleteTransactionByIdUrl = `${me.TransactionUrl}/?username=${userName}&id=${id}`,
          success = me.http.delete<boolean>(deleteTransactionByIdUrl, httpOptions)
                      .pipe(
                        tap(_ => me.log(`Transaction with id ${id} for user ${userName} was deleted.`)),
                        catchError(me.handleError<boolean>(`deleteTransactionById (userName:${userName}, id:${id})`))
                      );
    return success;
  }

  /**.*/
  updatetransaction(transaction: Transaction): Observable<any> {

    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          updatedConcept = me.http.post<Transaction>(me.TransactionUrl, transaction, httpOptions)
                        .pipe(
                          tap(_ => me.log(`Transaction with id ${transaction._id} for user ${transaction.username} was updated.`)),
                          catchError(me.handleError<any>(`updateTransaction (id:${transaction._id}`))
                        );

    return updatedConcept;
  }

// Private methods -------------

   /**
   * @param message - Message to be added to the list.
   */
  private log(message: string): void {
    // this.messageService.add('Transactionservice: ' + message );
  }

  /**
   * @param operation - name of the operation that failed.
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    const me = this;

    return (error: any): Observable<T> => {
      if (error.status === 401) {
        me.router.navigate(['/login']);
      }
      // console.error(error.error.message);
      me.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /**.*/
  private createHttpOptionsWithToken() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization-token': this.globals.getTokenFromLocalStorage()
      })
    };
  }

}
