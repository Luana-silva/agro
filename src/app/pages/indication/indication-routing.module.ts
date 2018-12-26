import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListIndicationPageComponent} from './list-indication/list-indication-page.component';
import {RegisterIndicationPageComponent} from './register-indication/register-indication-page.component';
import {ViewCompaniesPageComponent} from "../../modules/msk-company/view-company/view-company-page.component";
import {ViewIndicationsPageComponent} from "./view-indication/view-indication-page.component";

const routes: Routes = [
  {
    path: 'indication',
    children: [
      {
        path: 'list',
        component: ListIndicationPageComponent
      },
      {
        path: 'register',
        component: RegisterIndicationPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterIndicationPageComponent
      },
      {
        path: 'view/:id',
        component: ViewIndicationsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndicationRoutingModule { }
