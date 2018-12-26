import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListReportsPageComponent} from  './list-reports/list-reports-page.component';
import {RegisterReportsPageComponent} from  './register-reports/register-reports-page.component';
import {ViewReportsPageComponent} from './view-reports/view-reports-page.component';


const routes: Routes = [
  {
    path: 'reports',
    children: [
      {
        path: 'list',
        component: ListReportsPageComponent
      },
      {
        path: 'listConfirm',
        component: ListReportsPageComponent
      },
      {
        path: 'register',
        component: RegisterReportsPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterReportsPageComponent
      },
      {
        path: 'view/:id',
        component: ViewReportsPageComponent
      },
      {
        path: 'viewConfirm/:id',
        component: ViewReportsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKReportsRoutingModule { }
