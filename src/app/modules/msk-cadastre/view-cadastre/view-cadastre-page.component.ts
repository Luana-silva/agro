import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cadastre} from '../cadastre/cadastre';
import {ActivatedRoute, Router} from '@angular/router';
import {CadastreService} from '../cadastre/cadastre-service';
import {UserService} from '../../msk-user/user/user-service';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

@Component({
  selector: 'app-register-cadastre-page',
  templateUrl: './view-cadastre-page.component.html',
  styleUrls: ['./view-cadastre-page.component.scss'],
  providers: [
    CadastreService,
    UserService,
    StorageUtils
  ]
})
export class ViewCadastrePageComponent implements OnInit {

  cadastre: Cadastre;

  fgApprove: Boolean;

  url: string[];

  urlApprove: boolean;

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
    this.fgApprove = false;

    this.route.params.subscribe(params => {
      this.cadastre.id = params['id'];
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

    if (this.cadastre.id != null) {
      this.cadastreService.load(this.cadastre.id, (result, cadastre) => {
        if (cadastre != null) {
          this.cadastre = cadastre;

        }
        this.loadData();
      });
    }
    else {
      this.loadData()
    }

  }


  loadData() {

    if (this.cadastre.id == null) {
      this.cadastre = new Cadastre();
    }

    this.navBarDataService.changePageTitle('Visualizar')


  }

  save() {

    if (this.form.valid) {
      this.cadastreService.saveMobile(this.cadastre, (result, cadastre) => {
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
