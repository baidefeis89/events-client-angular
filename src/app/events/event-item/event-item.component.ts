import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ievent } from "../interfaces/ievent";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ae-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  
  @Input() event: Ievent;
  @Output() deleted: EventEmitter<void> = new EventEmitter<void>();
  

  constructor(private modal: NgbModal) { }

  ngOnInit() {
    
  }

  removeEvent(){
    let body = [];
    body.push('Do you want to remove this event?')
    const modalRef = this.modal.open(ConfirmModalComponent); 
    modalRef.componentInstance.title = 'Delete event'; 
    modalRef.componentInstance.body = body; 

    modalRef.result.then( response => {
      if (response) this.deleted.emit();
    });
  }

}
