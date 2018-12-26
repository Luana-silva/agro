import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ListContactusPageComponent} from "./list-contactus/list-contactus-page.component";
import {MSKContactusRoutingModule} from "./msk-contactus-routing.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ViewContactusPageComponent} from "./view-contactus/view-contactus-page.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MSKContactusRoutingModule,
        NgbModule,
        NgxDatatableModule
    ],
    declarations: [
      ListContactusPageComponent,
      ViewContactusPageComponent
    ]
})
export class MSKContactusModule { }
