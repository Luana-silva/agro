import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCreditPageComponent} from './list-credit/list-credit-page.component';
import {RegisterCreditPageComponent} from './register-credit/register-credit-page.component';

const routes: Routes = [
  {
    path: 'credit',
    children: [
      {
        path: 'list',
        component: ListCreditPageComponent
      },
      {
        path: 'register',
        component: RegisterCreditPageComponent
      },
      {
        path: 'register/:id',
        component: RegisterCreditPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditRoutingModule { }
