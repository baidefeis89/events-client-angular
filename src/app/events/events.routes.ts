import { RouterModule, Routes } from "@angular/router";

import { EventsShowComponent } from "./events-show/events-show.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventAddComponent } from "./event-add/event-add.component";

import { EventResolver } from "./services/event-resolver.service";

import { Show } from "../shared/show";
import { EditEventDeactivateGuard } from "../guards/edit-event-deactivate-guard.service";

const EVENTS_ROUTES: Routes = [
    { path: '', component: EventsShowComponent, data: { show: Show.ALL} },
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
        canDeactivate: [EditEventDeactivateGuard],
        resolve: {
            event: EventResolver
        }
    },
    {
        path: 'mine',
        component: EventsShowComponent,
        data: { show: Show.MINE}
    },
    {
        path: 'assist',
        component: EventsShowComponent,
        data: { show: Show.ATTEND }
    },
    {
        path: 'user/:id',
        component: EventsShowComponent
    }

];

export const EVENTS_ROUTING = RouterModule.forChild(EVENTS_ROUTES);
