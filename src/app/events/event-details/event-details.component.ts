import { Component, OnInit } from '@angular/core';
import { EventService } from "../services/event.service";
import { Ievent } from "../interfaces/ievent";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { Iuser } from '../../user/interfaces/iuser';

@Component({
  selector: 'ae-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Ievent;
  cantidad: number = 1;
  payedMessage: string = '';
  paymentStatus: boolean = null;
  amount: number;
  usersAttend: Iuser[];

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute,
              private router:Router, private modal: NgbModal) { }

  ngOnInit() {
    this.event = this.activatedRoute.snapshot.data['event'];
    this.eventService.getUsersAttend(this.event.id).subscribe( res => {
      this.usersAttend = res;
    });
    this.amount = this.event.price * this.cantidad;
  }

  removeEvent(){
    this.eventService.removeEvent(this.event.id).subscribe( response => {
      this.router.navigate(['/events']);
    }, error => {
      console.error(error);
    });
  }

  editEvent() {
    this.router.navigate(['/events/edit/' + this.event.id]);
  }

  modCantidad(mod) {
    this.cantidad += mod;
    this.check();
  }

  check() {
    this.cantidad = this.cantidad < 1 ? 1 : this.cantidad;
    this.amount = this.event.price * this.cantidad;
  }

  getPayment(ok: boolean) {
    if (ok) {
      this.eventService.attendEvent(this.event.id, this.cantidad).subscribe( res => {
        this.payedMessage = 'Payment correct!';
        this.paymentStatus = ok; 
        
        let body = [];
        body.push(`Event: ${this.event.title}`);
        body.push(`Number of tickets: ${this.cantidad}`);
        body.push(`Amount: ${this.amount}€`);

        const modalRef = this.modal.open(ConfirmModalComponent); 
        modalRef.componentInstance.title = this.payedMessage; 
        modalRef.componentInstance.body = body;
        modalRef.componentInstance.info = true;
    
        modalRef.result.then();
      }, err => {
        this.payedMessage = err;
        this.paymentStatus = false;
      })
    } else {
      this.payedMessage = 'Payment cancelled';
      this.paymentStatus = ok;
    }

  }

}
