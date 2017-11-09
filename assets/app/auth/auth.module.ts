import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

import { CookieService} from 'ngx-cookie-service';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';

import {LoadingModule,ANIMATION_TYPES} from 'ngx-loading';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ConfirmRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  })
  ],
  providers: [
    AuthService,
    CookieService
  ]
})
export class AuthModule {}
