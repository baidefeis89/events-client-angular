import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ievent } from "../interfaces/ievent";
import { Router } from "@angular/router";
import { EventService } from "../services/event.service";
import { NgModel } from '@angular/forms';

@Component({
  selector: 'ae-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  @Output() eventAdded: EventEmitter<Ievent> = new EventEmitter<Ievent>();
  newEvent: Ievent;
  //errorSuccess: boolean = false;
  error: string = null;
  today = new Date();

  constructor(private router:Router,
              private eventService:EventService) { }

  ngOnInit() {
    this.setVoid();
  }

  addEvent() {
    this.eventService.addEvent(this.newEvent).subscribe( response => {
      if (response) this.router.navigate(['/events']);
    }, error => {
      this.error = error;
      //this.error = true;
    });
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0 ) return;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
      this.newEvent.image = reader.result;
    });
  }

  setVoid() {
    this.newEvent = {
      title: '',
      image: '',
      date: '',
      description: '',
      price: 0,
      lat: 0,
      lng: 0,
      address: ''
    };
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  changePosition(pos: google.maps.LatLng) { console.log(pos);
    this.newEvent.lat = pos.lat();
    this.newEvent.lng = pos.lng();
    console.log('lat:',pos.lat(),' lng:',pos.lng());
  }

}
