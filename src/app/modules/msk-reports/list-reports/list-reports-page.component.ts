import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {ActivatedRoute, Router} from '@angular/router';
import {ReportsService} from '../reports/reports-service';
import {Reports} from '../reports/reports';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import swal from 'sweetalert2';
import {DateFormatPipe2} from '../../../pipes/date-format2.pipe';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

@Component({
  selector: 'app-list-reports-page',
  templateUrl: './list-reports-page.component.html',
  styleUrls: ['./list-reports-page.component.scss'],
  providers: [
    ReportsService,
    DateFormatPipe2,
    StorageUtils
  ]
})
export class ListReportsPageComponent implements OnInit {

  reports: Reports;

  rows = [];

  temp = [];

  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  url: string[];
  urlApprove: boolean;

  // DataTable Content Titles
  columns = [
    {prop: 'nome', name: 'Nome'},
    {prop: 'email', name: 'Email'},
    {prop: 'Reports', name: 'Reports'}
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private reportsService: ReportsService,
              private navBarDataService: NavBarDataService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() == 'event' || this.storageUtils.getRoleId() == 'null') {
      window.location.href = 'pages/login';
    }

    this.reports = new Reports();

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

    this.reportsService.listAll((result, list) => {
      if (list != null) {
        this.rows = list;
        this.temp = [...list];
      }
    });

    if (!this.urlApprove) {
      this.navBarDataService.changePageTitle('Relatórios')
    } else {
      this.navBarDataService.changePageTitle('Requisição de Cadastro')
    }

  }

  showMessages(row: any) {
    swal({
      title: 'Atenção',
      text: 'Tem certeza que deseja Remover esse relatório',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.removeReport(row);
        swal(
          'Removida',
          'O relatório foi removido com sucesso.',
          'success'
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelado',
          'O relatório não foi removido.',
          'error'
        )
      }
    })
  }

  removeReport(row) {

    row.status = 'BLOCKED';

    this.reportsService.updateFile(row, (result, user) => {
      if (result.success) {

        this.ngOnInit();
      }
      else {
        console.log('Error');
      }
    });

  }

  newReports() {
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
    const temp = this.temp.filter(function (data) {

      let creationDate = new DateFormatPipe2('en-US').transform(data.creationDate);
      return (data.data.toLowerCase().indexOf(val) !== -1) || (creationDate.toString().includes(val) || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
