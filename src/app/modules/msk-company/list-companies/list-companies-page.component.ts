import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company/company-service';
import {Company} from '../company/company';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

@Component({
  selector: 'app-list-companies-page',
  templateUrl: './list-companies-page.component.html',
  styleUrls: ['./list-companies-page.component.scss'],
  providers: [
    CompanyService,
    StorageUtils
  ]
})
export class ListCompaniesPageComponent implements OnInit {

  rows = [];

  temp = [];

  loadingIndicator = true;
  reorderable = true;

  url: string[];
  urlApprove: boolean;

  // DataTable Content Titles
  columns = [
    {prop: 'nome', name: 'Nome'},
    {prop: 'email', name: 'Email'},
    {prop: 'Company', name: 'Company'}
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private navBarDataService: NavBarDataService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() != 'admin') {
      window.location.href = 'pages/login';
    }

    this.url = window.location.pathname.split('/');

    if (this.url[3] === 'listConfirm') {
      this.urlApprove = true;
    } else {
      this.urlApprove = false;
    }

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  ngOnInit() {

    if (this.urlApprove) {
      this.companyService.listPendingApprove((result, list) => {
        if (list != null) {
          this.rows = list;
          this.temp = [...list];
        }
      });

    } else {
      this.companyService.listAll((result, list) => {
        if (list != null) {
          this.rows = list;
          this.temp = [...list];

        }
      });
    }

    if (!this.urlApprove) {
      this.navBarDataService.changePageTitle('Parceiros')
    } else {
      this.navBarDataService.changePageTitle('Requisição de Cadastro')
    }

  }


  newCompany() {
    this.router.navigate(['register'], {relativeTo: this.route.parent});
  }


  detail(row: any) {
    this.router.navigate(['register', row.id], {relativeTo: this.route.parent});
  }

  view(row: any) {
    if (this.urlApprove) {
      this.router.navigate(['viewConfirm', row.id], {relativeTo: this.route.parent});
    } else {
      this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
    }

  }

  viewConfirm(row: any) {
    this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {

      return (d.fantasyName.toLowerCase().indexOf(val) !== -1 || !val) || (d.addressInfo.city.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  changeStatus(row: any) {
    //changeStatus

    this.companyService.changeStatus(row, (result, user) => {
      if (result.success) {

        this.ngOnInit();
      } else {
        console.log('Error');
      }
    });
  }
}
