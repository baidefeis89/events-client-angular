import { Injectable } from '@angular/core';
import { Ievent } from '../interfaces/ievent';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EventService } from './event.service';

@Injectable()
export class EventResolver implements Resolve<Ievent>{
  
  constructor(private eventService: EventService,
              private router: Router) { }
              
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ievent> {
    return this.eventService.getEvent(route.params['id']).catch( error => {
      this.router.navigate(['/events']);
      return Observable.of(null);
    });
  }


}
