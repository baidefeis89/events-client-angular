import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { LoginComponent } from "./login/login.component";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { GoogleLoginModule } from '../google-login/google-login.module';
import { FacebookLoginModule } from '../facebook-login/facebook-login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]),
    GoogleLoginModule.forRoot('269115313905-om54ugojq4p7huf2d1pmm2a28i8377sl.apps.googleusercontent.com'),
    FacebookLoginModule.forRoot({app_id: '1138668136270505', version: 'v2.11'})

  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
