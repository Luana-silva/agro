import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListEventPageComponent} from "./list-event/list-event-page.component";
import {RegisterEventPageComponent} from "./register-event/register-event-page.component";
import {ViewEventPageComponent} from "./view-event/view-event-page.component";
import {NgbdTypeaheadHttp} from "./event/typeahead-template.component";
// import {UploadComponent} from "../../upload/upload.component";


const routes: Routes = [
  {
    path: 'event',
    children: [
      {
        path: 'list',
        component: ListEventPageComponent
      },
      {
        path: 'listConfirm',
        component: ListEventPageComponent
      },
      {
        path: 'register',
        component: RegisterEventPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterEventPageComponent
      },
      {
        path: 'view/:id',
        component: ViewEventPageComponent
      },
      {
        path: 'viewConfirm/:id',
        component: ViewEventPageComponent
      },
      {
        path: 'teste',
        component: NgbdTypeaheadHttp
      },
     // {
     //   path: 'upload',
    //   component: UploadComponent
    //  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKEventRoutingModule { }
