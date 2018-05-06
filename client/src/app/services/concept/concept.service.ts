import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MessageService } from '../message/message.service';
import { GlobalsService } from '../../globals/globals.service';
import { Concept } from '../../models/concept';

@Injectable()
export class ConceptService {

  private server = 'http://192.168.1.104:3000/';
  // private server = 'http://localhost:3000/';
  private conceptsUrl  = this.server + 'api/concepts';
  private conceptUrl  = this.server + 'api/concept';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private globals: GlobalsService,
    private router: Router
  ) { }

  /**.*/
  getConcepts(userName: string): Observable<Concept[]> {
    const me = this,
          getUserNameConceptsUrl = `${me.conceptsUrl}/?username=${userName}`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Concept[]>(getUserNameConceptsUrl, httpOptions)
              .pipe(
                tap(concepts => me.log('Concepts fetched.')),
                catchError(me.handleError('getConcepts', []))
              );
  }

  /**.*/
  getActiveConcepts(userName: string): Observable<Concept[]> {
    const me = this,
          getUserNameConceptsUrl = `${me.conceptsUrl}/?username=${userName}&active=true`,
          httpOptions = me.createHttpOptionsWithToken();

    return me.http.get<Concept[]>(getUserNameConceptsUrl, httpOptions)
              .pipe(
                tap(concepts => me.log('Active concepts fetched.')),
                catchError(me.handleError('getActiveConcepts', []))
              );
  }

  /**.*/
  addConcept(concept: Concept): Observable<Concept> {
    const me = this,
          body = JSON.stringify(Concept),
          httpOptions = me.createHttpOptionsWithToken();

    return this.http.post<Concept>(me.conceptsUrl, concept, httpOptions)
              .pipe(
                // tslint:disable-next-line:no-shadowed-variable
                tap((concept: Concept) => me.log(`Concept with id ${concept._id} was created.`)),
                catchError(me.handleError<Concept>('addConcept: failed to create new concept.'))
              );
  }

  /**.*/
  getConceptById(id: string): Observable<Concept> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          getConceptByIdUrl = `${me.conceptUrl}/?id=${id}`,
          concept = me.http.get<Concept>(getConceptByIdUrl, httpOptions)
                      .pipe(
                        tap(_ => me.log(`Concept with id ${id} was fetched.`)),
                        catchError(me.handleError<Concept>(`getConceptById (id:${id}`))
                      );
    return concept;
  }

  /**.*/
  updateConcept(concept: Concept): Observable<any> {

    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          updatedConcept = me.http.post<Concept>(me.conceptUrl, concept, httpOptions)
                        .pipe(
                          tap(_ => me.log(`Concept with id ${concept._id} was updated.`)),
                          catchError(me.handleError<any>(`updateConcept (id:${concept._id}`))
                        );

    return updatedConcept;
  }

  /**.*/
  filterConcepts(term: string): Observable<Concept[]> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken();

    let getConceptByNameUrl;

    if (!term.trim()) {
      // if not search term, return empty Concepts array.
      return of([]);
    }

    getConceptByNameUrl = `${me.conceptUrl}/?name=${term}`;

    return me.http.get<Concept[]>(getConceptByNameUrl, httpOptions)
          .pipe(
            tap(concepts => me.log(`Found ${concepts.length} concepts matching ${term}`)),
            catchError(me.handleError<Concept[]>('filterConcepts', []))
          );
  }

  // Private methods -------------

   /**
   * @param message - Message to be added to the list.
   */
  private log(message: string): void {
    // this.messageService.add('Conceptservice: ' + message );
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
