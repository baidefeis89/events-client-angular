import { Injectable } from '@angular/core';
import { Ievent } from "../interfaces/ievent";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Show } from '../../shared/show';
import { Iuser } from '../../user/interfaces/iuser';

@Injectable()
export class EventService {

  urlServer: string = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

  getEvents(show: Show, id?:number): Observable<Ievent[]> {
    let filter;

    if (id) 
      filter = '/user/' + id;
    else 
      filter = show === Show.ALL ? '' : '/' + Show[show].toLocaleLowerCase();

    return this.http.get(`${this.urlServer}events${filter}`).map( (response: {events: Ievent[], ok: boolean}) => {
      if(response.ok) {
        response.events.map( ev => {
          ev.image = `${this.urlServer}img/events/${ev.image}`;
        });
        return response.events;
      } else {
        return [];
      }
    });
  }

  getEvent(id: number): Observable<Ievent> {
    return this.http.get(`${this.urlServer}events/${id}`).map( (response: {event: Ievent, ok: boolean}) => {
      if (response.ok) {
        response.event.image = `${this.urlServer}img/events/${response.event.image}`;
        return response.event;
      }
    });
  }

  addEvent(event: Ievent): Observable<boolean> { 
    return this.http.post(`${this.urlServer}events`, event).map( (response: {ok: boolean, error?: string}) => {
      if (response.ok) return response.ok;
      throw response.error;
    });
  }

  removeEvent(id: number): Observable<boolean> {

    return this.http.delete(`${this.urlServer}events/${id}`).map( (response: {ok: boolean, error?: string}) => {
      if (response.ok ) return response.ok;
      throw response.error;
    });
  }

  attendEvent(idEvent: number, tickets: number): Observable<boolean> {
    return this.http.post(`${this.urlServer}events/attend/${idEvent}`, {number: tickets})
      .map( (response: {ok: boolean, result: any, error?: string}) => {
        if (response.ok) return response.ok;
        throw response.error;
      });
  }

  editEvent(event: Ievent): Observable<boolean> {
    return this.http.put(`${this.urlServer}events/${event.id}`, event)
      .map( (response: {ok: boolean, result?: string, error?: string}) => {
        if (response.ok) return response.ok;
        throw response.error;
      });
  }

  getUsersAttend(idEvent: number): Observable<Iuser[]> {
    return this.http.get(`${this.urlServer}users/event/${idEvent}`)
      .map( (response: {ok: boolean, result?: Iuser[], error?: string}) => {
        if (response.ok) {
          response.result.map( user => {
            user.avatar = `${this.urlServer}img/users/${user.avatar}`;
          })
          return response.result;
        } else {
          throw response.error;
        }
      })
  }

}
