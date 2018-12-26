import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from "./login/login-page.component";
import {ForgotPasswordPageComponent} from "./forgot-password/forgot-password-page.component";
import {EmailForgotPasswordUserbPageComponent} from "./email-userb/email-forgot-password-userb-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent
      },
      {
        path: 'email_forgot_password_userb',
        component: EmailForgotPasswordUserbPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKAdminRoutingModule { }
