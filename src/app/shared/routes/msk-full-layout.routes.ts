import {Routes} from '@angular/router';
import {RackRoutingModule} from '../../pages/rack/rack-routing.module';
import {RackModule} from '../../pages/rack/rack.module';
import {GroupTypeModule} from '../../pages/group-type/group-type.module';

//Route for content layout with sidebar, navbar and footer

export const MSK_FULL_LAYOUT_ROUTES: Routes = [
    {
      path: 'pages',
      loadChildren: './modules/msk-company/msk-company.module#MSKCompanyModule'
    },
    {
      path: 'pages',
      loadChildren: './modules/msk-post/msk-post.module#MSKPostModule'
    },
    {
      path: 'pages',
      loadChildren: './modules/msk-event/msk-event.module#MSKEventModule'
    },
    {
      path: 'pages',
      loadChildren: './modules/msk-cadastre/msk-cadastre.module#MSKCadastreModule'
    },
    {
      path: 'pages',
      loadChildren: './modules/msk-reports/msk-reports.module#MSKReportsModule'
    },
    {
      path: 'pages',
      loadChildren: './modules/msk-contactus/msk-contactus.module#MSKContactusModule'
    },
    {
      path: 'pages',
      loadChildren: './modules/msk-dashboard/dashboard-pages.module#DashboardPagesModule'
    },
    {
      path: 'pages',
      loadChildren: './pages/rack/rack.module#RackModule'
    },
    {
      path: 'pages',
      loadChildren: './pages/group-type/group-type.module#GroupTypeModule'
    },
    {
      path: 'pages',
      loadChildren: './pages/rmov/rmov.module#RmovModule'
    },
    {
      path: 'pages',
      loadChildren: './pages/credit/credit.module#CreditModule'
    },
    {
      path: 'pages',
      loadChildren: './pages/indication/indication.module#IndicationModule'
    }

];
