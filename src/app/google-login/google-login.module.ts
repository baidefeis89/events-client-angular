import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleLoginDirective } from './directives/google-login.directive';
import { LoadGoogleApiService } from './services/load-google-api.service';
import { CLIENT_ID } from './google-login.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GoogleLoginDirective],
  exports: [GoogleLoginDirective]
})
export class GoogleLoginModule { 
  static forRoot(client_id: string): ModuleWithProviders {
    return {
      ngModule: GoogleLoginModule,
      providers: [
        LoadGoogleApiService,
        { provide: CLIENT_ID, useValue: client_id }
      ]
    };
  }
}
