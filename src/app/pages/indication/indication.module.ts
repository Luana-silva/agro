import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {IndicationRoutingModule} from './indication-routing.module';
import {ListIndicationPageComponent} from './list-indication/list-indication-page.component';
import {RegisterIndicationPageComponent} from './register-indication/register-indication-page.component';
import {ViewIndicationsPageComponent} from "./view-indication/view-indication-page.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IndicationRoutingModule,
        NgbModule,
        NgxDatatableModule
    ],
    declarations: [
      ListIndicationPageComponent,
      RegisterIndicationPageComponent,
      ViewIndicationsPageComponent
    ]
})
export class IndicationModule { }
