import { Injectable } from '@angular/core';
import { CanDeactivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs/Observable';
import { EventAddComponent } from '../events/event-add/event-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Injectable()
export class EditEventDeactivateGuard implements CanDeactivate<EventAddComponent> {

  constructor(private auth:AuthService,
              private router:Router, private modal:NgbModal) { }

  canDeactivate(component: EventAddComponent, route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
    
    if (component.form.dirty && !component.submit) {
      const modalRef = this.modal.open(ConfirmModalComponent); 
      modalRef.componentInstance.title = 'Save changes?'; 
      modalRef.componentInstance.body = ['Do you want to save changes before exit?']; 
  
      return modalRef.result.then( result => {
        if (component.form.valid)
          component.addEvent();
        return false;
      }).catch( error => {
        return true;
      })
    } else {
      return true;
    }
    
  }
}
