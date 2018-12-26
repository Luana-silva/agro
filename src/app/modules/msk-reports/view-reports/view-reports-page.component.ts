import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Reports} from '../reports/reports';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportsService} from '../reports/reports-service';
import {UserService} from '../../msk-user/user/user-service';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

@Component({
  selector: 'app-register-reports-page',
  templateUrl: './view-reports-page.component.html',
  styleUrls: ['./view-reports-page.component.scss'],
  providers: [
    ReportsService,
    UserService,
    StorageUtils
  ]
})
export class ViewReportsPageComponent implements OnInit {

  reports: Reports;

  fgApprove: Boolean;

  url: string[];

  urlApprove: boolean;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private userService: UserService,
              private reportsService: ReportsService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() == 'event' || this.storageUtils.getRoleId() == 'null') {
      window.location.href = 'pages/login';
    }

    this.reports = new Reports();
    this.fgApprove = false;

    this.route.params.subscribe(params => {
      this.reports.id = params['id'];
    });

    this.url = window.location.pathname.split('/');

    if (this.url[3] == 'viewConfirm') {
      this.urlApprove = true;
    } else {
      this.urlApprove = false;
    }

    this.form = new FormGroup({
      switchApprove: new FormControl(this.fgApprove),
      desc: new FormControl()
    }, {updateOn: 'change'});
  }

  ngOnInit() {

    if (this.reports.id != null) {
      this.reportsService.load(this.reports.id, (result, reports) => {
        if (reports != null) {
          this.reports = reports;

        }
        this.loadData();
      });
    }
    else {
      this.loadData()
    }

  }


  loadData() {

    if (this.reports.id == null) {
      this.reports = new Reports();
    }

    this.navBarDataService.changePageTitle('Visualizar')


  }

  save() {

    if (this.form.valid) {
      this.reportsService.saveMobile(this.reports, (result, reports) => {
        if (result.success) {

          this.router.navigate(['listConfirm'], {relativeTo: this.route.parent});
        }
        else {
          console.log('Error');
        }
      });
    }
  }

}
