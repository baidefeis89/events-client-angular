import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './services/user.service';

import { SharedModule } from '../shared/shared.module';

import { USER_ROUTING } from './user.routes';

import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './services/user-resolver.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    USER_ROUTING
  ],
  declarations: [
    ProfileComponent,
    EditProfileComponent
  ],
  providers: [
    UserService,
    UserResolver
  ]
})
export class UserModule { }
