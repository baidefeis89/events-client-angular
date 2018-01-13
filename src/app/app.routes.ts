import { RouterModule, Routes } from "@angular/router";

import { LoginActivateGuard } from "./guards/login-activate-guard.service";
import { LogoutActivateGuard } from "./guards/logout-activate-guard.service";
import { PreloadingStrategy, PreloadAllModules } from "@angular/router";


const app_routes: Routes = [
    { path: 'auth', canActivate: [LogoutActivateGuard], loadChildren: './auth/auth.module#AuthModule' },
    { path: 'events', canActivate: [LoginActivateGuard], loadChildren: './events/events.module#EventsModule' },
    { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
    { path: '**', redirectTo: 'auth/login' }

];

export const APP_ROUTING = RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules });
