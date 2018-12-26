import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { CleanLayoutComponent } from "./layouts/clean/clean-layout.component";
//import {AppComponent} from "./app.component";
import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';
import {MSK_CONTENT_LAYOUT_ROUTES} from "./shared/routes/msk-content-layout.routes";
import {MSK_FULL_LAYOUT_ROUTES} from "./shared/routes/msk-full-layout.routes";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
  },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'MSK content Views' }, children: MSK_CONTENT_LAYOUT_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: CleanLayoutComponent, data: { title: 'MSK content Views' }, children: MSK_CONTENT_LAYOUT_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: FullLayoutComponent, data: { title: 'MSK full Views' }, children: MSK_FULL_LAYOUT_ROUTES, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
