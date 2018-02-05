import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { UserResolver } from "./services/user-resolver.service";

const USER_ROUTES: Routes = [
    { 
        path: '', 
        component: ProfileComponent,
        resolve: {
            user: UserResolver
        } 
    },{
        path: ':id',
        component: ProfileComponent,
        resolve: {
            user: UserResolver
        }
    }
    /*{ path: 'new', component: EventAddComponent },
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
    }*/

];

export const USER_ROUTING = RouterModule.forChild(USER_ROUTES);
