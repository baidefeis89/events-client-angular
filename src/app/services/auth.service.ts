import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  logged: boolean;
  @Output() $loginEmitter = new EventEmitter<boolean>();
  urlServer: string = 'http://arturober.com/svtickets-services/';

  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    let data = {email: email, password: password};

    return this.http.post<{token: string, ok: boolean}>(`${this.urlServer}auth/login`, JSON.stringify(data))
    .map( response => {
      if (response.ok) {
        localStorage.setItem('token',response.token);
        this.logged = true;
        this.$loginEmitter.emit(true);
        return true;
      } 
      return false;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.logged = false;
    this.$loginEmitter.emit(false);
  }

  isLogged(): Observable<boolean> {

    if (this.logged) {
      return Observable.of(true);
    } else if (localStorage.getItem('token')) {
      return this.http.get<{ok: boolean}>(`${this.urlServer}auth/token`)
        .map( response => {
          if (response.ok) {
            this.logged = true;
            this.$loginEmitter.emit(true);
            return true;
          }
          return false;
        });
    } else {
      return Observable.of(false);
    }
  }

}
