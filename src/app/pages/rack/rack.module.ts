import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {RackRoutingModule} from './rack-routing.module';
import {RegisterRackPageComponent} from './register-rack/register-rack-page.component';
import {ListRackPageComponent} from './list-rack/list-rack-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RackRoutingModule,
        NgbModule,
        NgxDatatableModule
    ],
    declarations: [
      ListRackPageComponent,
      RegisterRackPageComponent
    ]
})
export class RackModule { }
