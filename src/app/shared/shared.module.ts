import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAfterDirective } from './date-after/date-after.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateAfterDirective
  ],
  exports: [
    DateAfterDirective
  ]
})
export class SharedModule { }
