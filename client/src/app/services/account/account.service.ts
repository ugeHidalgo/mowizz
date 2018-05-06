import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../message/message.service';
import { GlobalsService } from '../../globals/globals.service';
import { Account } from '../../models/account';


@Injectable()
export class AccountService {

  private server = 'http://192.168.1.104:3000/';
  // private server = 'http://localhost:3000/';
  private accountsUrl  = this.server + 'api/accounts';
  private accountUrl  = this.server + 'api/account';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private globals: GlobalsService,
    private router: Router
  ) { }

  /**.*/
  getAccounts(userName: string): Observable<Account[]> {
    const me = this,
          getUserNameAccountsUrl = `${me.accountsUrl}/?username=${userName}`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Account[]>(getUserNameAccountsUrl, httpOptions)
              .pipe(
                tap(accounts => me.log('Accounts fetched.')),
                catchError(me.handleError('getAccounts', []))
              );
  }

   /**.*/
   getActiveAccounts(userName: string): Observable<Account[]> {
    const me = this,
          getUserNameAccountsUrl = `${me.accountsUrl}/?username=${userName}&active=true`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Account[]>(getUserNameAccountsUrl, httpOptions)
              .pipe(
                tap(accounts => me.log('Active accounts fetched.')),
                catchError(me.handleError('getActiveAccounts', []))
              );
  }

  /**.*/
  addAccount(account: Account): Observable<Account> {
    const me = this,
          body = JSON.stringify(account),
          httpOptions = me.createHttpOptionsWithToken();

    return this.http.post<Account>(me.accountsUrl, account, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap((account: Account) => me.log(`Account with id ${account._id} was created.`)),
                catchError(me.handleError<Account>('addAccount: failed to create new account.'))
              );
  }

  /**.*/
  getAccountById(id: string): Observable<Account> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          getAccountByIdUrl = `${me.accountUrl}/?id=${id}`,
          account = me.http.get<Account>(getAccountByIdUrl, httpOptions)
                      .pipe(
                        tap(_ => me.log(`Account with id ${id} was fetched.`)),
                        catchError(me.handleError<Account>(`getAccountById (id:${id}`))
                      );
    return account;
  }

  /**.*/
  updateAccount(account: Account): Observable<any> {

    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          updatedAccount = me.http.post<Account>(me.accountUrl, account, httpOptions)
                        .pipe(
                          tap(_ => me.log(`Account with id ${account._id} was updated.`)),
                          catchError(me.handleError<any>(`updateAccount (id:${account._id}`))
                        );

    return updatedAccount;
  }

  /**.*/
  filterAccounts(term: string): Observable<Account[]> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken();

    let getAccountByNameUrl;

    if (!term.trim()) {
      // if not search term, return empty accounts array.
      return of([]);
    }

    getAccountByNameUrl = `${me.accountUrl}/?name=${term}`;

    return me.http.get<Account[]>(getAccountByNameUrl, httpOptions)
          .pipe(
            tap(accounts => me.log(`Found accounts ${accounts.length} matching ${term}`)),
            catchError(me.handleError<Account[]>('filterAccounts', []))
          );
  }

  // Private methods -------------


   /**
   * @param message - Message to be added to the list.
   */
  private log(message: string): void {
    // this.messageService.add('AccountService: ' + message );
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
