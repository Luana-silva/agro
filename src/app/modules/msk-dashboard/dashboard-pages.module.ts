import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MatchHeightModule } from '../../shared/directives/match-height.directive';
import { DashboardPagesRoutingModule } from './dashboard-pages-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        DashboardPagesRoutingModule,
        ChartistModule,
        ChartsModule,
        NgbModule,
        MatchHeightModule,
        FormsModule
    ],
    declarations: [

        DashboardPageComponent
    ]
})
export class DashboardPagesModule { }
