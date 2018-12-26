import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import {TranslateModule} from '@ngx-translate/core';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ListCadastrePageComponent} from "./list-cadastre/list-cadastre-page.component";
import {MSKCadastreRoutingModule} from "./msk-cadastre-routing.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {RegisterCadastrePageComponent} from "./register-cadastre/register-cadastre-page.component";
import {CadastreService} from "./cadastre/cadastre-service";
import {ViewCadastrePageComponent} from "./view-cadastre/view-cadastre-page.component";

import {NgxMaskModule} from 'ngx-mask'

@NgModule({
    imports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MSKCadastreRoutingModule,
        NgbModule,
        NgxDatatableModule,
        ImageCropperModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
      ListCadastrePageComponent,
      RegisterCadastrePageComponent,
      ViewCadastrePageComponent
    ]
})
export class MSKCadastreModule { }
