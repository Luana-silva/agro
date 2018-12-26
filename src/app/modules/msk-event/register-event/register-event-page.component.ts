import {ChangeDetectorRef, Component, OnInit, ViewChild, Injectable, LOCALE_ID} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../event/event';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event/event-service';
import swal from 'sweetalert2';

import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';

import {Company} from '../../msk-company/company/company';
import {CompanyService} from '../../msk-company/company/company-service';

import {DateFormatPipe} from '../../../pipes/date-format.pipe';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {companyCard} from '../../msk-company/company-card/company-card';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbCarouselConfig, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {PhotoUpload} from '../../msk-core/photo/photo-upload';
import {Constants} from '../../../utils/constants';
import {FormUtils} from '../../../shared/form/form.utils';

import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

import {registerLocaleData} from '@angular/common';
import localePtBr from '@angular/common/locales/pt';

registerLocaleData(localePtBr, 'pt-BR');

const I18N_VALUES = {
  'br': {
    weekdays: ['Se', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Do'],
    months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  }
  // other languages you would support
};

@Injectable()
export class I18n {
  language = 'br';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

declare var require: any;

const now = new Date();

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {EventAutoCompleteService} from '../event/event-auto-complete.service';
import {StorageUtils} from '../../../utils/storage-utils';


@Component({
  selector: 'app-register-event-page',
  templateUrl: './register-event-page.component.html',
  styleUrls: ['./register-event-page.component.scss'],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    NgbDatepickerConfig,
    CompanyService,
    EventService,
    NgbCarouselConfig,
    EventAutoCompleteService,
    StorageUtils

  ]
})
export class RegisterEventPageComponent implements OnInit {

  formatDate: any;
  normalDate: string[];

  // Variable Declaration
  public model: any;
  modelFormat: any;
  modelWiki: any;
  modelTemp: any;
  searching = false;
  searchFailed = false;

  public formUtils: FormUtils;

  locale = 'pt-br';
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  typeImage: any;

  // cropper
  data: any;

  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  // cropper

  source: LocalDataSource;

  rowOptions: Company[];

  rows = [];

  companies: companyCard[];

  companias = [];
  temp = [];

  company: Company;
  companyCard: companyCard;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  url: string[];

  // DataTable Content Titles
  columns = [
    {prop: 'nome', name: 'Nome'},
    {prop: 'email', name: 'Email'},
    {prop: 'Company', name: 'Company'}
  ];

  newEdit: string;

  event: Event;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  @ViewChild('vform') validationForm: FormGroup;

  form: FormGroup;

  constructor(config: NgbCarouselConfig,
              config2: NgbDatepickerConfig,
              private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private eventService: EventService,
              private _service: EventAutoCompleteService,
              private localeService: BsLocaleService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() != 'admin') {
      window.location.href = 'pages/login';
    }

    //carousel
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    //carousel

    // cropper
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = 230;
    this.cropperSettings.croppedHeight = 230;
    this.cropperSettings.canvasWidth = 600;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.noFileInput = true;
    this.data = {};

    this.typeImage = 'logo';

    this.source = new LocalDataSource();

    this.event = new Event();

    this.company = new Company();

    this.event.companies = new Array();

    this.companyCard = new companyCard();

    this.url = window.location.pathname.split('/');

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);

    this.route.params.subscribe(params => {
      this.event.id = params['id'];
      this.logoUrl = this.getUrl('logo');
      this.coverUrl = this.getUrl('cover');
    });

    this.formUtils = new FormUtils(this.form);

    this.localeService.use(this.locale);
    this.bsConfig = Object.assign({}, {containerClass: 'theme-dark-blue', dateInputFormat: 'DD/MM/YYYY'});
  }

  // Wiki Search
  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );

  public formatterSearch = (x: { name: string }) => x.name;

  ngOnInit() {

    if (this.event.id != null) {
      this.eventService.load(this.event.id, (result, event) => {
        if (event != null) {
          this.event.begin = new DateFormatPipe('en-US').transform(this.event.begin);
          this.event.end = new DateFormatPipe('en-US').transform(this.event.end);

          this.formatDate = this.event.begin;
          this.normalDate = this.formatDate.split('/');
          this.formatDate = this.normalDate[2] + '-' + this.normalDate[1] + '-' + this.normalDate[0];
          this.event.begin = new Date(this.formatDate);

          this.formatDate = this.event.end;
          this.normalDate = this.formatDate.split('/');
          this.formatDate = this.normalDate[2] + '-' + this.normalDate[1] + '-' + this.normalDate[0];
          this.event.end = new Date(this.formatDate);

          this.source = new LocalDataSource(event.companies);

          //this.rows  = this.event.companies;
          //this.event.name = name;
        }
        this.loadData();
      });
    } else {

      this.event = new Event();
      this.event.companies = new Array();
      this.event.compamiesIds = new Array();

      this.loadData()
    }

    this.companyService.listActiveCards((result, list) => {
      if (list != null) {
        this.rowOptions = list;
        this.temp = [...list];
      }
    });

    this.navBarDataService.changePageTitle('Evento')
  }


  changeTypeImage() {
    // alert(this.typeImage);

    if (this.typeImage === 'logo') {

      // cropper
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.croppedWidth = 100;
      this.cropperSettings.minWidth = 100;

      this.cropperSettings.croppedHeight = 100;
      this.cropperSettings.minHeight = 100;

      this.cropperSettings.canvasWidth = 600;
      this.cropperSettings.canvasHeight = 400;

      this.cropperSettings.noFileInput = true;
      this.data = {};
      // cropper

    } else {
      // cropper
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.croppedWidth = 735;
      this.cropperSettings.minWidth = 735;

      this.cropperSettings.croppedHeight = 800;
      this.cropperSettings.minHeight = 800;

      this.cropperSettings.canvasWidth = 600;
      this.cropperSettings.canvasHeight = 400;

      this.cropperSettings.noFileInput = true;
      this.data = {};
      // cropper
    }

  }

  addPhoto() {

    var photoUpload = new PhotoUpload();

    photoUpload.idObject = this.event.id;
    photoUpload.width = 200;

    var photoUploadArray = this.data.image.split('base64,');
    photoUpload.photo = photoUploadArray[1];

    if (this.typeImage === 'logo') {
      photoUpload.idSubObject = 'logo'
    } else {
      photoUpload.idSubObject = 'cover'
    }

    const newImage = this.data.image;

    this.data = {};
    this.eventService.saveImage(photoUpload, (result) => {

      if (result.success) {
        console.log('SUCESSO');

        this.typeImage === 'logo' ? this.logoUrl = newImage : this.coverUrl = newImage;

      } else {
        console.log('Error');
      }
    });

  }

  getUrl(urlSufix: string): string {
    if (this.event.id) {
      return this.event.id ? `${Constants.SERVICE_URL}${Constants.SERVICE_PROJETC}event/image/${this.event.id}/${urlSufix}` : null;
    }
  }

  logoUrl: any;

  coverUrl: any;

  addCompany() {
    if (!this.companias.find(c => c.id === this.companyCard.id)) {
      this.companias.push(this.companyCard.id)
      this.companies = this.companias;
      this.event.companies.push(this.companyCard);
      this.event.companies = [...this.event.companies];
      this.event.compamiesIds.push(this.companyCard.id);
    } else {
      swal(
        'Cancelado',
        'A empresa já foi adicionada.',
        'error'
      );
    }
    this.companyCard = null;
  }

  removeCompany(idCompany) {
    swal({
      title: 'Atenção',
      text: 'Tem certeza que deseja remover este parceiro',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.value) {
        this.event.companies = this.event.companies.filter(c => c.id !== idCompany);
        this.event.compamiesIds = this.event.compamiesIds.filter(cIds => cIds !== idCompany);
        swal(
          'Removida',
          'O companhia foi removida com sucesso.',
          'success'
        );
        return true;
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelado',
          'A empresa não foi removida.',
          'error'
        );
        return false;
      }
    })
  }

  detail(row: any) {
    this.router.navigate(['register', row.id], {relativeTo: this.route.parent});
  }

  view(row: any) {
    this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
  }

  viewConfirm(row: any) {
    this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {

      return (d.fantasyName.toLowerCase().indexOf(val) !== -1 || !val) || (d.document.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  delete(row: any) {
    //changeStatus

    this.companyService.changeStatus(row, (result, user) => {
      if (result.success) {

        this.ngOnInit();
      }
      else {
        console.log('Error');
      }
    });
  }


  loadData() {

    if (this.event.id == null) {
      this.event = new Event();
      this.event.companies = new Array();
      this.event.compamiesIds = new Array();

      this.newEdit = 'Nova';
    } else {
      this.newEdit = 'Editar - ' + this.event.fantasyName;
    }
    this.navBarDataService.changePageTitle('Evento');

    this.form = new FormGroup({
      userName: new FormControl(this.event.userName, [Validators.required]),
      userEmail: new FormControl(this.event.userEmail, [Validators.required, Validators.email]),
      name: new FormControl(this.event.name, [Validators.required]),
      primaryColor: new FormControl(this.event.primaryColor, [Validators.required]),
      secundaryColor: new FormControl(this.event.secundaryColor, [Validators.required]),
      secondaryMessage: new FormControl(this.event.secondaryMessage, [Validators.required]),
      begin: new FormControl(this.event.begin, [Validators.required]),
      end: new FormControl(this.event.end, [Validators.required]),
      mainMessage: new FormControl(this.event.mainMessage, [Validators.required]),
      company: new FormControl(this.company),
      typeImage: new FormControl()
    }, {updateOn: 'change'});
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

  save() {
    if (this.form.valid) {
      this.eventService.save(this.event, (result, user) => {
        if (result.desc == 'email_already_registred') {
          this.showMessages();
        }
        if (result.success) {
          this.router.navigate(['list'], {relativeTo: this.route.parent});
        } else {
          console.log('Error');
        }
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
      swal(
        'Verifique os dados',
        'Não foi possível salvar.',
        'error'
      );
    }
  }

  // cropper
  fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);

  }

  // cropper

}
