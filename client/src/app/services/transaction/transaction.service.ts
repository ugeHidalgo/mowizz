import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../message/message.service';
import { GlobalsService } from '../../globals/globals.service';
import { Transaction } from '../../models/transaction';

@Injectable()
export class TransactionService {

  private server = 'http://192.168.1.104:3000/';
  // private server = 'http://localhost:3000/';
  private transactionsUrl  = this.server + 'api/transactions';
  private TransactionUrl  = this.server + 'api/transaction';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private globals: GlobalsService,
    private router: Router
  ) { }


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