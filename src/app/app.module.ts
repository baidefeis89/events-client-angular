import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

//Custom Modules
import { MenuModule } from "./menu/menu.module";
import { SharedModule } from './shared/shared.module';

//Components
import { AppComponent } from './app.component';

//Routes
import { APP_ROUTING } from "./app.routes";

//Services
import { AuthService } from "./services/auth.service";

//Guards
import { LoginActivateGuard } from "./guards/login-activate-guard.service";
import { LogoutActivateGuard } from "./guards/logout-activate-guard.service";
import { AuthInterceptor } from './services/auth-token-interceptor.service';
import { EditEventDeactivateGuard } from './guards/edit-event-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
    MenuModule,
    SharedModule
  ],
  providers: [
    AuthService,
    LoginActivateGuard,
    LogoutActivateGuard,
    EditEventDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
