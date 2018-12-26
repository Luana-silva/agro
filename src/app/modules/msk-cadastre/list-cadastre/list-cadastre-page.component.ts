import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {ActivatedRoute, Router} from '@angular/router';
import {CadastreService} from '../cadastre/cadastre-service';
import {Cadastre} from '../cadastre/cadastre';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import swal from 'sweetalert2';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

@Component({
  selector: 'app-list-cadastre-page',
  templateUrl: './list-cadastre-page.component.html',
  styleUrls: ['./list-cadastre-page.component.scss'],
  providers: [
    CadastreService,
    StorageUtils

  ]
})
export class ListCadastrePageComponent implements OnInit {

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
    {prop: 'Cadastre', name: 'Cadastre'}
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cadastreService: CadastreService,
              private navBarDataService: NavBarDataService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() != 'admin') {
      window.location.href = 'pages/login';
    }

    this.url = window.location.pathname.split('/');

    if (this.url[3] == 'listConfirm') {
      this.urlApprove = true;
    } else {
      this.urlApprove = false;
    }

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  ngOnInit() {

    this.cadastreService.listAll((result, list) => {
      if (list != null) {
        this.rows = list;
        this.temp = [...list];
      }
    });

    if (!this.urlApprove) {
      this.navBarDataService.changePageTitle('Usuário')
    } else {
      this.navBarDataService.changePageTitle('Requisição de Cadastro')
    }

  }

  showMessages(row: any) {
    swal({
      title: 'Atenção',
      text: 'Tem certeza que deseja desativar esse usuário',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.disableUser(row);
        swal(
          'Removida',
          'O usuário foi desativado com sucesso.',
          'success'
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelado',
          'O usuário não foi desativado.',
          'error'
        )
      }
    })
  }

  disableUser(row: any) {
    //changeStatus

    this.cadastreService.changeStatus(row, (result, user) => {
      if (result.success) {

        this.ngOnInit();
      }
      else {
        console.log('Error');
      }
    });
  }

  newCadastre() {
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

      return (d.name.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
