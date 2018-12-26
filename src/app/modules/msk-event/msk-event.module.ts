import {NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatPipe} from '../../pipes/date-format.pipe';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);
import {DateTimeFormatPipe} from '../../pipes/date-time-format.pipe';
import {EventAutoCompleteService} from "./event/event-auto-complete.service";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ng2-img-cropper';
import { MyDatePickerModule } from 'mydatepicker';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ListEventPageComponent} from "./list-event/list-event-page.component";
import {MSKEventRoutingModule} from "./msk-event-routing.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {RegisterEventPageComponent} from "./register-event/register-event-page.component";
import {EventService} from "./event/event-service";
import {ViewEventPageComponent} from "./view-event/view-event-page.component";
import {NgbdTypeaheadHttp} from "./event/typeahead-template.component";
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MSKEventRoutingModule,
        NgbModule,
        NgxDatatableModule,
        ImageCropperModule,
        MyDatePickerModule,
        NgxMaskModule.forRoot(),
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot()
    ],
    declarations: [
      ListEventPageComponent,
      RegisterEventPageComponent,
      ViewEventPageComponent,
      DateFormatPipe,
      DateTimeFormatPipe,
      NgbdTypeaheadHttp,
    ],
    providers: [
        EventAutoCompleteService, // seu provider aqui
    ]

})
export class MSKEventModule { }
