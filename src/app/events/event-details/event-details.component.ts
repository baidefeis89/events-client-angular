import { Component, OnInit } from '@angular/core';
import { EventService } from "../services/event.service";
import { Ievent } from "../interfaces/ievent";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'ae-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Ievent;

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.event = this.activatedRoute.snapshot.data['event'];
  }

  removeEvent(){
    this.eventService.removeEvent(this.event.id).subscribe( response => {
      this.router.navigate(['/events']);
    }, error => {
      console.error(error);
    });
  }

}
