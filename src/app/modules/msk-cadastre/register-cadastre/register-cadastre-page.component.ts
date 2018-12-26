import {Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cadastre} from '../cadastre/cadastre';
import {ActivatedRoute, Router} from '@angular/router';
import {CadastreService} from '../cadastre/cadastre-service';

import swal from 'sweetalert2';

import {LocalDataSource} from 'ng2-smart-table';

import {Role} from '../role/role';
import {FormUtils} from '../../../shared/form/form.utils';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;


@Component({
  selector: 'app-register-cadastre-page',
  templateUrl: './register-cadastre-page.component.html',
  styleUrls: ['./register-cadastre-page.component.scss'],
  providers: [
    CadastreService,
    StorageUtils
  ]
})
export class RegisterCadastrePageComponent implements OnInit {
  public formUtils: FormUtils;

  source: LocalDataSource;

  rows = [];

  newEdit: string;

  cadastre: Cadastre;

  role: Role;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private cadastreService: CadastreService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() != 'admin') {
      window.location.href = 'pages/login';
    }

    this.cadastre = new Cadastre();

    this.cadastre.role = new Role();

    this.route.params.subscribe(params => {
      this.cadastre.id = params['id'];
    });

    this.formUtils = new FormUtils(this.form);
  }

  showMessages() {
    swal({
      title: 'Atenção',
      text: 'Esse email ja esta em uso.',
      type: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    })
  }

  ngOnInit() {

    if (this.cadastre.id != null) {
      this.cadastreService.load(this.cadastre.id, (result, cadastre) => {
        if (cadastre != null) {
          this.cadastre = cadastre;
        }
      });
    }

    this.loadData();

    this.navBarDataService.changePageTitle('Usuários')
  }


  loadData() {

    if (this.cadastre.id == null) {
      this.newEdit = 'Nova';
    } else {
      this.newEdit = 'Editar - ' + this.cadastre.name;
    }
    this.navBarDataService.changePageTitle('Usuário');

    this.form = new FormGroup({
      name: new FormControl(this.cadastre.name, [Validators.required]),
      email: new FormControl(this.cadastre.email, [Validators.required])
    }, {updateOn: 'change'});
  }

  save() {

    if (this.form.valid) {
      if (this.cadastre.id != null) {

        this.cadastreService.saveUser(this.cadastre, (result) => {
          if (!result.success) {
            console.log(result.desc);
            console.log('Error');
          } else {

            this.router.navigate(['list'], {relativeTo: this.route.parent});
          }
        });
      } else {

        this.cadastre.role.id = 'admin';

        this.cadastreService.newUser(this.cadastre, (result) => {
          if (!result.success) {
            if (result.desc == 'email_already_registred') {
              this.showMessages();
            }
            console.log(result.desc);
            console.log('Error');
          } else {

            this.router.navigate(['list'], {relativeTo: this.route.parent});
          }
        });
      }

    }
  }

}
