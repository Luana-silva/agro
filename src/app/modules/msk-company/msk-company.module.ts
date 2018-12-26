import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import {TranslateModule} from '@ngx-translate/core';
import {UploadComponent} from "../../upload/upload.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ListCompaniesPageComponent} from './list-companies/list-companies-page.component';
import {MSKCompanyRoutingModule} from './msk-company-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {RegisterCompaniesPageComponent} from './register-company/register-company-page.component';
import {ViewCompaniesPageComponent} from './view-company/view-company-page.component';
import { CurrencyMaskModule } from 'ngx-currency-mask';

import {NgxMaskModule} from 'ngx-mask'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MSKCompanyRoutingModule,
        TranslateModule,
        NgbModule,
        CurrencyMaskModule,
        NgxDatatableModule,
        ImageCropperModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
      ListCompaniesPageComponent,
      RegisterCompaniesPageComponent,
      ViewCompaniesPageComponent,
      UploadComponent
    ]
})
export class MSKCompanyModule { }
