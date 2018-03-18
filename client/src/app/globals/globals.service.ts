import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

  userNameLogged: string;
  localStorageStore = 'currentUser';

  constructor() { }

  setUser(userName: string) {
    const me = this;
    me.userNameLogged = userName;
  }

  clearUser() {
    const me = this;
    me.userNameLogged = undefined;
  }

  storeUserDataInLocalStorage(userName, token) {
    localStorage.setItem(this.localStorageStore, JSON.stringify({
      app: 'TotalHero',
      username: userName,
      token: token
    }));
  }

  getUserDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.localStorageStore));
  }

  getUserNameFromLocalStorage() {
    const me = this,
          userData = me.getUserDataFromLocalStorage();

    return userData ? userData.username : '';
  }

  getTokenFromLocalStorage() {
    const me = this,
          userData = me.getUserDataFromLocalStorage();

    return userData ? userData.token : '';
  }

  removeUserDataFromLocalStorage() {
    localStorage.removeItem(this.localStorageStore);
  }

}
