import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUsersPageComponent} from "./list-user/list-users-page.component";
import {RegisterUserPageComponent} from "./register-user/register-user-page.component";
import {EmailForgotPasswordPageComponent} from "./email-user/email-forgot-password-page.component";
import {EmailForgotPasswordUserbPageComponent} from "../msk-admin/email-userb/email-forgot-password-userb-page.component";

const routes: Routes = [
  {
    path: 'user',
    children: [
      {
        path: 'list',
        component: ListUsersPageComponent
      },
      {
        path: 'register',
        component: RegisterUserPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterUserPageComponent
      },
      {
        path: 'email_forgot_password',
        component: EmailForgotPasswordPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKUserRoutingModule { }
