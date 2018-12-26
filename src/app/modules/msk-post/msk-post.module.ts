import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ng2-img-cropper';
import {TranslateModule} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {ListPostPageComponent} from './list-post/list-post-page.component';
import {MSKPostRoutingModule} from './msk-post-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {PostService} from './post/post-service';
import {ViewPostPageComponent} from './view-post/view-post-page.component';

import {NgxMaskModule} from 'ngx-mask'
import {DateFormatPipe3} from '../../pipes/date-format.pipe3';

@NgModule({
  imports: [
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MSKPostRoutingModule,
    NgbModule,
    NgxDatatableModule,
    TranslateModule,
    ImageCropperModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    ListPostPageComponent,
    ViewPostPageComponent,
    DateFormatPipe3
  ]
})
export class MSKPostModule {
}
