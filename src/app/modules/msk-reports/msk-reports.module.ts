import {NgModule} from '@angular/core';
import {DateFormatPipe2} from '../../pipes/date-format2.pipe';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import {ListReportsPageComponent} from "./list-reports/list-reports-page.component";
import {MSKReportsRoutingModule} from "./msk-reports-routing.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {RegisterReportsPageComponent} from "./register-reports/register-reports-page.component";
import {ReportsService} from "./reports/reports-service";
import {ViewReportsPageComponent} from "./view-reports/view-reports-page.component";

import {NgxMaskModule} from 'ngx-mask'

@NgModule({
    imports: [
        FileUploadModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MSKReportsRoutingModule,
        NgbModule,
        NgxDatatableModule,
        TranslateModule,
        ImageCropperModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
      ListReportsPageComponent,
      RegisterReportsPageComponent,
      ViewReportsPageComponent,
      DateFormatPipe2
    ]
})
export class MSKReportsModule { }
