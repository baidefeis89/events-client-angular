import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { LoginComponent } from "./login/login.component";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'login', component: LoginComponent}
    ])
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule { }
