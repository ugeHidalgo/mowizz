import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../message/message.service';
import { GlobalsService } from '../../globals/globals.service';
import { Budget } from '../../models/budget';

@Injectable()
export class BudgetService {

  private budgetsUrl: string;
  private budgetUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private globals: GlobalsService,
    private router: Router
  ) {
    this.budgetsUrl = globals.server + 'api/budgets';
    this.budgetUrl = globals.server + 'api/budget';

  }

  /**.*/
  getBudgets(userName: string): Observable<Budget[]> {
    const me = this,
          getUserNameBudgetsUrl = `${me.budgetsUrl}/?username=${userName}`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Budget[]>(getUserNameBudgetsUrl, httpOptions)
              .pipe(
                tap(budgets => me.log('Budgets fetched.')),
                catchError(me.handleError('getBudgets', []))
              );
  }

  /**.*/
  getActiveBudgets(userName: string): Observable<Budget[]> {
    const me = this,
          getUserNameBudgetsUrl = `${me.budgetsUrl}/?username=${userName}&active=true`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Budget[]>(getUserNameBudgetsUrl, httpOptions)
              .pipe(
                tap(budgets => me.log('Active budgets fetched.')),
                catchError(me.handleError('getActiveBudgets', []))
              );
  }

  /**.*/
  getActiveExpenseBudgets(userName: string): Observable<Budget[]> {
    const me = this,
          getUserNameBudgetsUrl = `${me.budgetsUrl}/?username=${userName}&active=true&type=expense`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Budget[]>(getUserNameBudgetsUrl, httpOptions)
              .pipe(
                tap(budgets => me.log('Active expense Budgets fetched.')),
                catchError(me.handleError('getActiveExpenseBudgets', []))
              );
  }

  /**.*/
  getActiveIncomeBudgets(userName: string): Observable<Budget[]> {
    const me = this,
          getUserNameBudgetsUrl = `${me.budgetsUrl}/?username=${userName}&active=true&type=income`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Budget[]>(getUserNameBudgetsUrl, httpOptions)
              .pipe(
                tap(budgets => me.log('Active income Budgets fetched.')),
                catchError(me.handleError('getActiveIncomeBudgets', []))
              );
  }

  /**.*/
  addBudget(budget: Budget): Observable<Budget> {
    const me = this,
          body = JSON.stringify(Budget),
          httpOptions = me.createHttpOptionsWithToken();

    return this.http.post<Budget>(me.budgetsUrl, budget, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap((budget: Budget) => me.log(`Budget with id ${budget._id} was created.`)),
                catchError(me.handleError<Budget>('addBudget: failed to create new budget.'))
              );
  }

  /**.*/
  getBudgetById(username: string, id: string): Observable<Budget> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          getBudgetByIdUrl = `${me.budgetUrl}/?id=${id}&username=${username}`,
          budget = me.http.get<Budget>(getBudgetByIdUrl, httpOptions)
                      .pipe(
                        tap(_ => me.log(`Budget with id ${id} was fetched.`)),
                        catchError(me.handleError<Budget>(`getBudgetById (id:${id}`))
                      );
    return budget;
  }

  /**.*/
  updateBudget(Budget: Budget): Observable<any> {

    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          updatedBudget = me.http.post<Budget>(me.budgetUrl, Budget, httpOptions)
                        .pipe(
                          tap(_ => me.log(`Budget with id ${Budget._id} was updated.`)),
                          catchError(me.handleError<any>(`updateBudget (id:${Budget._id}`))
                        );

    return updatedBudget;
  }

  /**.*/
  filterBudgets(term: string): Observable<Budget[]> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken();

    let getBudgetByNameUrl;

    if (!term.trim()) {
      // if not search term, return empty Budgets array.
      return of([]);
    }

    getBudgetByNameUrl = `${me.budgetUrl}/?name=${term}`;

    return me.http.get<Budget[]>(getBudgetByNameUrl, httpOptions)
          .pipe(
            tap(budgets => me.log(`Found ${budgets.length} budgets matching ${term}`)),
            catchError(me.handleError<Budget[]>('filterBudgets', []))
          );
  }

  // Private methods -------------

   /**
   * @param message - Message to be added to the list.
   */
  private log(message: string): void {
    // this.messageService.add('Budgetservice: ' + message );
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
