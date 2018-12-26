import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListGroupTypePageComponent} from './list-group-type/list-group-type-page.component';
import {RegisterGroupTypePageComponent} from './register-group-type/register-group-type-page.component';

const routes: Routes = [
  {
    path: 'grouptype',
    children: [
      {
        path: 'list',
        component: ListGroupTypePageComponent
      },
      {
        path: 'register',
        component: RegisterGroupTypePageComponent
      },
      {
        path: 'register/:id',
        component: RegisterGroupTypePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupTypeRoutingModule { }
