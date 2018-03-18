import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../../models/user';
import { GlobalsService } from '../../globals/globals.service';

@Injectable()
export class UserService {

  private server = 'http://192.168.1.104:3000/';
  // private server = 'http://localhost:3000/';
  private userUrl  = this.server + 'api/user';
  private authUserUrl  = this.server + 'api/auth';

  constructor(
    private http: HttpClient,
    private globals: GlobalsService
  ) { }

  /**.*/
  isUserAuthenticated(userData: any): Observable<any> {
    return this.http.post<any>(this.authUserUrl, userData);
  }

  /**.*/
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  /**.*/
  getUser(userName: string): Observable<User> {
    const me = this,
          httpOptions = me.createHttpOptionsWithToken(),
          getUserUrl = `${me.userUrl}/?username=${userName}`,
          user = me.http.get<User>(getUserUrl, httpOptions);
    return user;
  }

   // Private methods -------------

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

