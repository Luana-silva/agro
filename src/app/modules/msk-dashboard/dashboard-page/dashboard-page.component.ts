import {Component, OnInit} from '@angular/core';

import * as Chartist from 'chartist';
import {ChartType, ChartEvent} from 'ng-chartist/dist/chartist.component';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {Dashboard} from '../dashboard/dashboard';
import {DashboardService} from '../dashboard/dashboard-service';
import {StorageUtils} from '../../../utils/storage-utils';

let id;

declare var require: any;

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [DashboardService,
    StorageUtils]
})


export class DashboardPageComponent implements OnInit {

  dashboard: Dashboard;

  constructor(private navBarDataService: NavBarDataService,
              private dashboardservice: DashboardService,
              private storageUtils: StorageUtils) {

    this.navBarDataService.changePageTitle('Dashboard');

    this.dashboard = new Dashboard();

  }

  ngOnInit() {
    this.dashboard = new Dashboard();

    id = this.storageUtils.getIdEvent();

    if (id == 'null' || id == null) {
      this.dashboardservice.dashboardCompany((result, dashboard) => {
        if (dashboard != null) {
          this.lineArea2.data = dashboard;
        }
      });
    } else {
      this.dashboardservice.dashboardEvent((result, dashboard) => {
        if (dashboard != null) {
          this.lineArea2.data = dashboard;
        }
      });

    }
  }

  // Line area chart 2 configuration Starts
  lineArea2: Chart = {
    type: 'Line',
    data: this.dashboard,
    options: {
      showArea: true,
      fullWidth: true,
      onlyInteger: true,
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showGrid: false,
      },
      axisY: {
        low: 0,
        scaleMinSpace: 50,
      }
    },
    responsiveOptions: [
      ['screen and (max-width: 640px) and (min-width: 381px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      }],
      ['screen and (max-width: 380px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 3 === 0 ? value : null;
          }
        }
      }]
    ],
    events: {
      created(data): void {
        const defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 0, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(146, 254, 157, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient1',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
      },
      draw(data): void {
        const circleRadius = 4;
        if (data.type === 'point') {

          const circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            class: 'ct-point-circle'
          });
          data.element.replace(circle);
        } else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width);
          data.element.attr({x: data.element.attr('x') - dX})
        }
      }
    },
  };
  // Line area chart 2 configuration Ends

}



