import { Pipe, PipeTransform } from '@angular/core';
import { Ievent } from "../interfaces/ievent";

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(data: Ievent[], filter?: string): Ievent[] {
    if(!filter) return data;
    return data.filter( event => event.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

}
