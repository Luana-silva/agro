import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event/event-service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DateFormatPipe} from '../../../pipes/date-format.pipe';
import {Constants} from '../../../utils/constants';
import {StorageUtils} from '../../../utils/storage-utils';


declare var require: any;

@Component({
  selector: 'app-list-event-page',
  templateUrl: './list-event-page.component.html',
  styleUrls: ['./list-event-page.component.scss'],
  providers: [
    EventService,
    DateFormatPipe,
    StorageUtils
  ]
})
export class ListEventPageComponent implements OnInit {

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
    {prop: 'Event', name: 'Event'}
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private eventService: EventService,
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

    this.eventService.listAll((result, list) => {
      if (list != null) {
        this.rows = list;
        this.temp = [...list];
      }
    });

    if (!this.urlApprove) {
      this.navBarDataService.changePageTitle('Eventos')
    } else {
      this.navBarDataService.changePageTitle('Requisição de Cadastro')
    }

  }


  newEvent() {
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

  viewPage(row: any) {
    window.open(Constants.SERVICE_URL + '?e=' + row.id, '_blank');
  }

  viewConfirm(row: any) {
    this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (data) {

      let begin = new DateFormatPipe('en-US').transform(data.begin);
      let end = new DateFormatPipe('en-US').transform(data.end);
      return (data.name.toLowerCase().includes(val) || !val) || (begin.toString().includes(val) || !val) || (end.toString().includes(val) || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  changeStatus(row: any) {
    //changeStatus
    if (row.status === 'BLOCKED') {
      row.status = 'ACTIVE'
    } else {
      row.status = 'BLOCKED';
    }


    this.eventService.save(row, (result, user) => {
      if (result.success) {

        this.ngOnInit();
      }
      else {
        console.log('Error');
      }
    });
  }
}
