///<reference path="../../msk-core/info/info.ts"/>
///<reference path="../company/company.ts"/>
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../company/company';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company/company-service';
import {User} from '../../msk-user/user/user';
import {UserService} from '../../msk-user/user/user-service';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

@Component({
  selector: 'app-register-companies-page',
  templateUrl: './view-company-page.component.html',
  styleUrls: ['./view-company-page.component.scss'],
  providers: [
    CompanyService,
    UserService,
    StorageUtils
  ]
})
export class ViewCompaniesPageComponent implements OnInit {

  company: Company;

  listUser: User[];

  fgApprove: Boolean;

  url: string[];

  urlApprove: boolean;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private userService: UserService,
              private companyService: CompanyService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() != 'admin') {
      window.location.href = 'pages/login';
    }

    this.company = new Company();
    this.fgApprove = false;

    this.route.params.subscribe(params => {
      this.company.id = params['id'];
    });

    this.url = window.location.pathname.split('/');

    if (this.url[3] === 'viewConfirm') {
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

    if (this.company.id != null) {
      this.companyService.load(this.company.id, (result, company) => {
        if (company != null) {
          this.company = company;

          if (this.company.info != null && this.company.info.fgApprove != null) {
            this.fgApprove = this.company.info.fgApprove;
          }

          this.loadUser(company.id)

        }
        this.loadData();
      });
    } else {
      this.loadData()
    }

  }

  loadUser(idUser: string) {

    this.userService.listByCompany(idUser, (result, data) => {
      if (data != null) {
        this.listUser = data;
      }
    });

  }

  loadData() {

    if (this.company.id == null) {
      this.company = new Company();
    }

    this.navBarDataService.changePageTitle('Visualizar')


  }

  save() {

    if (this.form.valid) {
      this.companyService.saveMobile(this.company, (result, company) => {
        if (result.success) {

          this.router.navigate(['listConfirm'], {relativeTo: this.route.parent});
        } else {
          console.log('Error');
        }
      });
    }
  }

}
