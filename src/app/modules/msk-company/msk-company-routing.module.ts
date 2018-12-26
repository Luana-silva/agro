import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListCompaniesPageComponent} from "./list-companies/list-companies-page.component";
import {RegisterCompaniesPageComponent} from "./register-company/register-company-page.component";
import {ViewCompaniesPageComponent} from "./view-company/view-company-page.component";


const routes: Routes = [
  {
    path: 'company',
    children: [
      {
        path: 'list',
        component: ListCompaniesPageComponent
      },
      {
        path: 'listConfirm',
        component: ListCompaniesPageComponent
      },
      {
        path: 'register',
        component: RegisterCompaniesPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterCompaniesPageComponent
      },
      {
        path: 'view/:id',
        component: ViewCompaniesPageComponent
      },
      {
        path: 'viewConfirm/:id',
        component: ViewCompaniesPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKCompanyRoutingModule { }
