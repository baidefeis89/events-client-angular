import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Ievent } from "../interfaces/ievent";
import { Router, ActivatedRoute } from "@angular/router";
import { EventService } from "../services/event.service";
import { NgModel } from '@angular/forms';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
  selector: 'ae-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  @Output() eventAdded: EventEmitter<Ievent> = new EventEmitter<Ievent>();
  @ViewChild('eventForm') form;
  event: Ievent;
  newEvent: Ievent;
  error: string = null;
  today = new Date();
  submit: boolean = false;

  constructor(private router:Router, private modal: NgbModal,
              private activatedRoute: ActivatedRoute,
              private eventService:EventService) { }

  ngOnInit() {  
    this.event = this.activatedRoute.snapshot.data['event'];
    this.setVoid();
  }

  addEvent() {
    if (this.event) {
      this.eventService.editEvent(this.newEvent).subscribe( response => {
        if (response) {
        const modalRef = this.modal.open(ConfirmModalComponent); 
        modalRef.componentInstance.title = 'Event updated'; 
        modalRef.componentInstance.body = ['Event information has been updated'];
        modalRef.componentInstance.info = true;
        this.submit = true;
    
        modalRef.result.then( () =>  this.router.navigate(['/events/details', this.event.id]) );
        }
      })
    } else {
      this.eventService.addEvent(this.newEvent).subscribe( response => {
        if (response) this.router.navigate(['/events']);
      }, error => {
        this.error = error;
      });
    }
      
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
    if (!this.event)
      this.newEvent = {
        title: '',
        image: '',
        date: '',
        description: '',
        price: 1,
        lat: 0,
        lng: 0,
        address: ''
      };
    else {
      if (!this.event.mine) this.router.navigate(['/events']);
      this.newEvent = this.event;
      this.newEvent.date = this.newEvent.date.split('T')[0];
    }
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  changePosition(pos: google.maps.LatLng) { 
    this.newEvent.lat = pos.lat();
    this.newEvent.lng = pos.lng();
  }

}
