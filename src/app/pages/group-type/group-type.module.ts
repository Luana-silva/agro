import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {GroupTypeRoutingModule} from './group-type-routing.module';
import {ListGroupTypePageComponent} from './list-group-type/list-group-type-page.component';
import {RegisterGroupTypePageComponent} from './register-group-type/register-group-type-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        GroupTypeRoutingModule,
        NgbModule,
        NgxDatatableModule
    ],
    declarations: [
      ListGroupTypePageComponent,
      RegisterGroupTypePageComponent
    ]
})
export class GroupTypeModule { }
