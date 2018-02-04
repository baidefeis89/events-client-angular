import { RouterModule, Routes } from "@angular/router";

import { EventsShowComponent } from "./events-show/events-show.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventAddComponent } from "./event-add/event-add.component";

import { EventResolver } from "./services/event-resolver.service";

const EVENTS_ROUTES: Routes = [
    { path: '', component: EventsShowComponent },
    { path: 'new', component: EventAddComponent },
    { 
        path: 'details/:id', 
        component: EventDetailsComponent, 
        resolve: {
            event: EventResolver
        } 
    },
    { 
        path: 'edit/:id', 
        component: EventAddComponent,
        resolve: {
            event: EventResolver
        }
    }

];

export const EVENTS_ROUTING = RouterModule.forChild(EVENTS_ROUTES);
