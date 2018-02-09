import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


//Components
import { EventAddComponent } from "./event-add/event-add.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventItemComponent } from "./event-item/event-item.component";
import { EventsShowComponent } from "./events-show/events-show.component";

//Services
import { EventService } from "./services/event.service";
import { EventResolver } from './services/event-resolver.service';

//Routes
import { EVENTS_ROUTING } from "./events.routes";

//Pipes
import { EventFilterPipe } from "./pipes/event-filter.pipe";

//Shared
import { SharedModule } from "../shared/shared.module";
import { PaypalButtonModule } from '../paypal-button/paypal-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EVENTS_ROUTING,
    SharedModule,
    PaypalButtonModule.forRoot({
      sandbox: 'AUzcxodr70gxqvIcCQSss_VSwWI5hRkICIyfT0tAUHFhb9UjqfKRmwU5ZNEcOaD7LZS67Lo3pcoIVCtK',
      production: '',
      environment: 'sandbox'
    })
  ],
  declarations: [
    EventAddComponent,
    EventDetailsComponent,
    EventItemComponent,
    EventsShowComponent,
    EventFilterPipe
  ],
  providers: [
    EventService,
    EventResolver,
  ]
})
export class EventsModule { }
