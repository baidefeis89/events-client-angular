import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAfterDirective } from './date-after/date-after.directive';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AgmCoreModule } from "@agm/core";
import { GmapsAutocompleteDirective } from './gmaps-autocomplete/gmaps-autocomplete.directive';

import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTa_i6W9Hse6NcxF3IUUQjCFHWSdtut6A',
      libraries: ['places']
    })
  ],
  declarations: [
    DateAfterDirective,
    ConfirmModalComponent,
    GmapsAutocompleteDirective
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  exports: [
    DateAfterDirective,
    ConfirmModalComponent,
    AgmCoreModule,
    GmapsAutocompleteDirective
  ]
})
export class SharedModule { }
