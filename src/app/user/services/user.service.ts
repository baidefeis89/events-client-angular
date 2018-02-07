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

    editUser(user: Iuser): Observable<boolean> {
        let data = {
            email: user.email,
            name: user.name
        };

        return this.http.put(`${this.urlServer}users/me`, data)
            .map( (response: {ok:boolean, error?: string}) => {
                if (response.ok) return response.ok;
                throw response.error;
            });
    }

    editAvatar(user: Iuser): Observable<boolean> {
        let data = {
            avatar: user.avatar
        };

        return this.http.put(`${this.urlServer}users/me/avatar`, data)
            .map( (response: {ok:boolean, error?: string}) => {
                if (response.ok) return response.ok;
                throw response.error;
            });
    }

    editPassword(data): Observable<boolean> {
        return this.http.put(`${this.urlServer}users/me/password`, data)
        .map( (response: {ok:boolean, error?: string}) => {
            if (response.ok) return response.ok;
            throw response.error;
        });
    }



}
