import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAfterDirective } from './date-after/date-after.directive';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot()
  ],
  declarations: [
    DateAfterDirective,
    ConfirmModalComponent
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    DateAfterDirective,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
