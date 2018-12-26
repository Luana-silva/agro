import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginPageComponent } from "./login/login-page.component";
import {MSKAdminRoutingModule} from "./msk-admin-routing.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ForgotPasswordPageComponent} from "./forgot-password/forgot-password-page.component";
import {EmailForgotPasswordUserbPageComponent} from "./email-userb/email-forgot-password-userb-page.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MSKAdminRoutingModule,
        NgbModule
    ],
    declarations: [
        LoginPageComponent,
        ForgotPasswordPageComponent,
        EmailForgotPasswordUserbPageComponent
    ]
})
export class MSKAdminModule { }
