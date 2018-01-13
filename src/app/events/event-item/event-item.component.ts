import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ievent } from "../interfaces/ievent";

@Component({
  selector: 'ae-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input() event: Ievent;
  @Output() deleted: EventEmitter<void> = new EventEmitter<void>();
  

  constructor() { }

  ngOnInit() {
    
  }

  removeEvent(){
    this.deleted.emit();
  }

}
