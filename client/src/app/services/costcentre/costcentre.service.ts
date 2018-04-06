import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../message/message.service';
import { GlobalsService } from '../../globals/globals.service';
import { CostCentre } from '../../models/costcentre';

@Injectable()
export class CostCentreService {

  private server = 'http://192.168.1.104:3000/';
  // private server = 'http://localhost:3000/';
  private costCentresUrl  = this.server + 'api/costCentres';
  private costCentreUrl  = this.server + 'api/costCentre';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private globals: GlobalsService,
    private router: Router
  ) { }

  /**.*/
  getCostCentres(userName: string): Observable<CostCentre[]> {
    const me = this,
          getUserNameCostCentresUrl = `${me.costCentresUrl}/?username=${userName}`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<CostCentre[]>(getUserNameCostCentresUrl, httpOptions)
              .pipe(
                tap(costCentres => me.log('Cost Centres fetched.')),
                catchError(me.handleError('getCostCentres', []))
              );
  }

  /**.*/
  addCostCentre(costCentre: CostCentre): Observable<CostCentre> {
    const me = this,
          body = JSON.stringify(costCentre),
          httpOptions = me.createHttpOptionsWithToken();

    return this.http.post<CostCentre>(me.costCentresUrl, costCentre, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap((costCentre: CostCentre) => me.log(`Cost Centre with id ${costCentre._id} was created.`)),
                catchError(me.handleError<CostCentre>('addCostCentre: failed to create new Cost Centre.'))
              );
  }

  /**.*/
  getCostCentreById(id: string): Observable<CostCentre> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          getcostCentreByIdUrl = `${me.costCentreUrl}/?id=${id}`,
          costCentre = me.http.get<CostCentre>(getcostCentreByIdUrl, httpOptions)
                      .pipe(
                        tap(_ => me.log(`costCentre with id ${id} was fetched.`)),
                        catchError(me.handleError<CostCentre>(`getcostCentreById (id:${id}`))
                      );
    return costCentre;
  }

  /**.*/
  updateCostCentre(costCentre: CostCentre): Observable<any> {

    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          updatedCostCentre = me.http.post<CostCentre>(me.costCentreUrl, costCentre, httpOptions)
                        .pipe(
                          tap(_ => me.log(`Cost Centre with id ${costCentre._id} was updated.`)),
                          catchError(me.handleError<any>(`updateCostCentre (id:${costCentre._id}`))
                        );

    return updatedCostCentre;
  }

  /**.*/
  filterCostCentres(term: string): Observable<CostCentre[]> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken();

    let getCostCentreByNameUrl;

    if (!term.trim()) {
      // if not search term, return empty costCentres array.
      return of([]);
    }

    getCostCentreByNameUrl = `${me.costCentreUrl}/?name=${term}`;

    return me.http.get<CostCentre[]>(getCostCentreByNameUrl, httpOptions)
          .pipe(
            tap(costCentres => me.log(`Found Cost Centres ${costCentres.length} matching ${term}`)),
            catchError(me.handleError<CostCentre[]>('filterCostCentres', []))
          );
  }

  // Private methods -------------

   /**
   * @param message - Message to be added to the list.
   */
  private log(message: string): void {
    // this.messageService.add('costCentreservice: ' + message );
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
