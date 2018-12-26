  import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ListUsersPageComponent} from "./list-user/list-users-page.component";
import {RegisterUserPageComponent} from "./register-user/register-user-page.component";
import {MSKUserRoutingModule} from "./msk-user-routing.module";
import {EmailForgotPasswordPageComponent} from "./email-user/email-forgot-password-page.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MSKUserRoutingModule,
        NgbModule,
        NgxDatatableModule
    ],
    declarations: [

    ]
})
export class MSKUserEmailModule { }
