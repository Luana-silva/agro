import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRackPageComponent} from './list-rack/list-rack-page.component';
import {RegisterRackPageComponent} from './register-rack/register-rack-page.component';

const routes: Routes = [
  {
    path: 'rack',
    children: [
      {
        path: 'list',
        component: ListRackPageComponent
      },
      {
        path: 'register',
        component: RegisterRackPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterRackPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RackRoutingModule { }
