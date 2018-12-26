import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListCadastrePageComponent} from "./list-cadastre/list-cadastre-page.component";
import {RegisterCadastrePageComponent} from "./register-cadastre/register-cadastre-page.component";
import {ViewCadastrePageComponent} from "./view-cadastre/view-cadastre-page.component";


const routes: Routes = [
  {
    path: 'useradmin',
    children: [
      {
        path: 'list',
        component: ListCadastrePageComponent
      },
      {
        path: 'listConfirm',
        component: ListCadastrePageComponent
      },
      {
        path: 'register',
        component: RegisterCadastrePageComponent
      },
      {
        path: 'register/:id',
        component: RegisterCadastrePageComponent
      },
      {
        path: 'view/:id',
        component: ViewCadastrePageComponent
      },
      {
        path: 'viewConfirm/:id',
        component: ViewCadastrePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKCadastreRoutingModule { }
