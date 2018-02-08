import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Ievent } from "../interfaces/ievent";
import { EventService } from "../services/event.service";
import { EventFilterPipe } from "../pipes/event-filter.pipe";

import { Show } from '../../shared/show';

@Component({
  selector: 'ae-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css']
})
export class EventsShowComponent implements OnInit {

  events: Ievent[] = [];
  newEvent: Ievent;
  filter = '';
  show: Show;
  userId: number;
  
  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
    this.show = this.activatedRoute.snapshot.data['show'];
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.eventService.getEvents(this.show, this.userId).subscribe( response => {
      this.events = response;
    }, error => {
      console.error(error);
    });
  }

  orderByDate() {
    this.events.sort( (ev1,ev2) => 
    (new Date(ev1.date).getTime()) - (new Date(ev2.date).getTime())
  );
    this.filter = '';
  }

  orderByPrice() {
    this.events.sort( (ev1,ev2) => ev1.price - ev2.price);
    this.filter = '';
  }

  removeEvent(index: number){
    this.eventService.removeEvent(this.events[index].id).subscribe( response => {
      this.events.splice(index, 1);
      this.filter = '';
    }, error => {
      console.error(error);
    });
  }

}
