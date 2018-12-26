import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CreditRoutingModule} from './credit-routing.module';
import {ListCreditPageComponent} from './list-credit/list-credit-page.component';
import {RegisterCreditPageComponent} from './register-credit/register-credit-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CreditRoutingModule,
        NgbModule,
        NgxDatatableModule
    ],
    declarations: [
      ListCreditPageComponent,
      RegisterCreditPageComponent
    ]
})
export class CreditModule { }
