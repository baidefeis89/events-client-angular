import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: '[aeDateAfter]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateAfterDirective, multi: true}]
})
export class DateAfterDirective implements Validator{
  @Input() aeDateAfter: string;

  validate(c: AbstractControl): { [key: string]: any } {
    if (c.value) {
        const minDate   = new Date(this.aeDateAfter);
        const inputDate = new Date(c.value);
        console.log(minDate, inputDate);
        return minDate <= inputDate ? null : {'minDate': minDate.toLocaleDateString()};
    }
    return null;
}

  constructor() { }

}
