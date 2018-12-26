import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListRmovPageComponent} from './list-rmov/list-rmov-page.component';
import {RegisterRmovPageComponent} from './register-rmov/register-rmov-page.component';

const routes: Routes = [
  {
    path: 'rmov',
    children: [
      {
        path: 'list',
        component: ListRmovPageComponent
      },
      {
        path: 'register',
        component: RegisterRmovPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterRmovPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RmovRoutingModule { }
