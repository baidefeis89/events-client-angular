import { Injectable } from '@angular/core';
import { Iuser } from "../interfaces/iuser";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService {

  urlServer: string = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

    getUser(id?: number) {
        let url = id ? `${this.urlServer}users/${id}` : `${this.urlServer}users/me`;

        return this.http.get(url).map( (response: {ok: boolean, result?: Iuser, error?: string}) => {
            if (response.ok) {
                response.result.avatar = `${this.urlServer}img/users/${response.result.avatar}`;
                response.result.me = id ? false: true;
                return response.result;
            }
            throw response.error;
        });
    
    }

    getMe(): Observable<Iuser> {
        return this.http.get(`${this.urlServer}users/me`).map( (response: {ok: boolean, result?: Iuser, error?: string}) => {
            if (response.ok) {
                response.result.avatar = `${this.urlServer}img/users/${response.result.avatar}`;
                return response.result;
            }
            throw response.error;
        });
    }


  getEvent(id: number): Observable<Iuser> {

    return this.http.get(`${this.urlServer}events/${id}`).map( (response: {user: Iuser, ok: boolean}) => {
      if (response.ok) {
        response.user.avatar = `${this.urlServer}img/events/${response.user.avatar}`;
        return response.user;
      }
    });
  }

  editEvent(event: Iuser): Observable<boolean> {
    return this.http.put(`${this.urlServer}events/${event.id}`, event)
      .map( (response: {ok: boolean, result?: string, error?: string}) => {
        if (response.ok) return response.ok;
        throw response.error;
      });
  }

}
