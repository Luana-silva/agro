import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListPostPageComponent} from './list-post/list-post-page.component';
import {ViewPostPageComponent} from './view-post/view-post-page.component';


const routes: Routes = [
  {
    path: 'post',
    children: [
      {
        path: 'list',
        component: ListPostPageComponent
      },
      {
        path: 'listConfirm',
        component: ListPostPageComponent
      },
      {
        path: 'view/:id',
        component: ViewPostPageComponent
      },
      {
        path: 'viewConfirm/:id',
        component: ViewPostPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MSKPostRoutingModule {
}
