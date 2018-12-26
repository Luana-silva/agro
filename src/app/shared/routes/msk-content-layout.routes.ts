import { Routes, RouterModule } from '@angular/router';
import {MSKUserEmailModule} from "../../modules/msk-user/msk-user-email.module";

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const MSK_CONTENT_LAYOUT_ROUTES: Routes = [
    {
        path: 'pages',
        loadChildren: './modules/msk-admin/msk-admin.module#MSKAdminModule'
    },
    {
      path: 'pages',
      loadChildren: './modules/msk-user/msk-user.module#MSKUserModule'
    }
];
