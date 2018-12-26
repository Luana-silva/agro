import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListContactusPageComponent} from "./list-contactus/list-contactus-page.component";
import {ViewContactusPageComponent} from "./view-contactus/view-contactus-page.component";


const routes: Routes = [
  {
    path: 'contactus',
    children: [
      {
        path: 'list',
        component: ListContactusPageComponent
      },
      {
        path: 'view/:id',
        component: ViewContactusPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKContactusRoutingModule { }
