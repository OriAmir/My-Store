import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth-guard.service';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';

const authRoutes: Routes = [
  { path: 'signup', component: SignupComponent,canActivate:[AuthGuard] },
  { path: 'signin', component: SigninComponent ,canActivate:[AuthGuard]},
  { path: 'confirm-registration', component: ConfirmRegistrationComponent ,canActivate:[AuthGuard]},
  { path: 'confirm-registration/:id', component: ConfirmRegistrationComponent ,canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
