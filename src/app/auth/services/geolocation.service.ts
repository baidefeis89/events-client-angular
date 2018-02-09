import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class GeolocationService {

  constructor() { }

  getLocation(): Observable<{lat: number, lng: number}> {
    return new Observable( observer => {
      navigator.geolocation.getCurrentPosition( res => {
        let position = {lat: res.coords.latitude, lng: res.coords.longitude};
        observer.next(position);
      });
    });
  }

}
