import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {RmovRoutingModule} from './rmov-routing.module';
import {ListRmovPageComponent} from './list-rmov/list-rmov-page.component';
import {RegisterRmovPageComponent} from './register-rmov/register-rmov-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RmovRoutingModule,
        NgbModule,
        NgxDatatableModule
    ],
    declarations: [
      ListRmovPageComponent,
      RegisterRmovPageComponent
    ]
})
export class RmovModule { }
