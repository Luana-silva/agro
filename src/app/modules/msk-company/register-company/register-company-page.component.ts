import {Component, OnInit, ViewChild} from '@angular/core';

import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../company/company';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../company/company-service';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {AddressInfo} from '../../msk-core/address/address-info';
import {SalesOff} from '../../msk-offert/salesoffer/salesOff';

import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

import {NgbCarousel, NgbCarouselConfig, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {Constants} from '../../../utils/constants';
import {PhotoUpload} from '../../msk-core/photo/photo-upload';
import {FormUtils} from '../../../shared/form/form.utils';
import {Info} from '../../msk-core/info/info';
import swal from 'sweetalert2';
import {StorageUtils} from '../../../utils/storage-utils';

declare var require: any;

let checkGallery: boolean;

@Component({
  selector: 'app-register-companies-page',
  templateUrl: './register-company-page.component.html',
  styleUrls: ['./register-company-page.component.scss'],
  providers: [
    NgbRatingConfig,
    CompanyService,
    NgbCarouselConfig,
    StorageUtils
  ]
})
export class RegisterCompaniesPageComponent implements OnInit {
  public formUtils: FormUtils;

  // cropper
  data: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  typeImage: any;

// cropper


  checkCep: boolean;

  newEdit: string;

  lblCPFCNPJ: string;

  company: Company;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;
  logoUrl;

  constructor(config: NgbCarouselConfig,
              config1: NgbRatingConfig,
              private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private storageUtils: StorageUtils) {

    if (this.storageUtils.getRoleId() != 'admin') {
      window.location.href = 'pages/login';
    }

    //rating
    config1.max = 5;
    //rating

    //carousel
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    //carousel

    // cropper
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.croppedWidth = 735;
    this.cropperSettings.minWidth = 735;

    this.cropperSettings.croppedHeight = 800;
    this.cropperSettings.minHeight = 800;

    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.noFileInput = true;
    this.data = {};
    // cropper

    this.typeImage = 'gallery';

    this.company = new Company();

    this.route.params.subscribe(params => {
      this.company.id = params['id'];
      this.logoUrl = this.getUrl('logo');
    });

    this.formUtils = new FormUtils(this.form);
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    if (this.company.id != null) {

      this.companyService.load(this.company.id, (result, company) => {

        if (company != null) {
          this.company = company;
        }
        this.loadData();
      });

    } else {

      checkGallery = true;

      this.company = new Company();

      this.company.info = new Info();

      this.company.addressInfo = new AddressInfo();

      this.company.salesOff = new Array();
      this.company.salesOff.push(new SalesOff());
      this.company.salesOff.push(new SalesOff());

      this.loadData();

      this.company.info.stars = 2;

    }

    this.changeCompanyEntity();
  }

  loadData() {

    if (this.company.id == null) {

      this.navBarDataService.changePageTitle('Parceiro');
      this.newEdit = 'Nova' + this.company.name;

    } else {

      this.navBarDataService.changePageTitle('Parceiro');
      this.newEdit = 'Editar - ' + this.company.name;

    }

    this.form = new FormGroup({
      number: new FormControl(this.company.addressInfo.number, [Validators.required]),
      name: new FormControl(this.company.name, [Validators.required]),
      street: new FormControl(this.company.addressInfo.street, [Validators.required]),
      state: new FormControl(this.company.addressInfo.state, [Validators.required]),
      city: new FormControl(this.company.addressInfo.city, [Validators.required]),
      zipCode: new FormControl(this.company.addressInfo.zipCode, [Validators.required]),
      complement: new FormControl(this.company.addressInfo.complement),
      district: new FormControl(this.company.addressInfo.district, [Validators.required]),
      document: new FormControl(this.company.document, [Validators.required]),
      url: new FormControl(this.company.info.url, [Validators.required]),
      userName: new FormControl(this.company.info.userName, [Validators.required]),
      userEmail: new FormControl(this.company.info.userEmail, [Validators.required, Validators.email]),
      stars: new FormControl(this.company.info.stars),
      priceNow1: new FormControl(this.company.salesOff[0].priceNow, [Validators.required]),
      title1: new FormControl(this.company.salesOff[0].title, [Validators.required]),
      priceNow2: new FormControl(this.company.salesOff[1].priceNow, [Validators.required]),
      title2: new FormControl(this.company.salesOff[1].title, [Validators.required]),
      typeImage: new FormControl(),
      desc: new FormControl(this.company.desc, [Validators.required])
    }, {updateOn: 'change'});
  }

  returnAddress() {

    if (this.company.addressInfo.zipCode != null && this.company.addressInfo.zipCode != '') {
      this.companyService.returnAddress(this.company.addressInfo.zipCode, (endereco: any) => {
        if (endereco != null && endereco.erro != true) {
          this.company.addressInfo.state = endereco.uf;
          this.company.addressInfo.street = endereco.logradouro;
          this.company.addressInfo.district = endereco.bairro;
          this.company.addressInfo.city = endereco.localidade;

          this.checkCep = false;
        } else {
          this.checkCep = true;

          this.company.addressInfo.state = '';
          this.company.addressInfo.street = null;
          this.company.addressInfo.district = '';
          this.company.addressInfo.city = '';

          this.company.addressInfo.number = '0';

        }
      });
    } else {
      console.log('Cep obrigatorio');
    }
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
      this.companyService.save(this.company, (result, user) => {
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
    }
  }

  addPhoto() {

    let photoUpload = new PhotoUpload();

    photoUpload.idObject = this.company.id;
    photoUpload.width = 200;

    let photoUploadArray = this.data.image.split('base64,'); //only image base64 api support
    photoUpload.photo = photoUploadArray[1];

    if (this.typeImage === 'logo') {
      photoUpload.idSubObject = 'logo'
    }
    const uploadedImage = this.data.image;
    this.data = {};

    this.companyService.saveCompanyImage(photoUpload, (result) => {
      if (this.typeImage === 'logo') {
        this.logoUrl = uploadedImage;
      }

      if (result.success) {

        if (this.company.id != null) {
          this.companyService.load(this.company.id, (result, company) => {
            if (company != null) {
              this.company.gallery = company.gallery;
            }
          });
        }

      } else {
        console.log('Error');
      }
    });

  }

  changeTypeImage() {
    //alert(this.typeImage);

    if (this.typeImage == 'logo') {

      // cropper
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.croppedWidth = 230;
      this.cropperSettings.minWidth = 230;

      this.cropperSettings.croppedHeight = 230;
      this.cropperSettings.minHeight = 230;

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

      this.cropperSettings.canvasWidth = 400;
      this.cropperSettings.canvasHeight = 400;
      this.cropperSettings.noFileInput = true;
      this.data = {};
      // cropper
    }

  }

  removePhoto(idPhoto: any) {

    var index = this.company.gallery.indexOf(idPhoto);
    if (index != -1) {
      this.company.gallery.splice(index, 1);
    }
  }

  changeCompanyEntity() {

    if (this.company.entity == 'F') {
      this.lblCPFCNPJ = 'CPF (only number)';
    }
    else {
      this.lblCPFCNPJ = 'CNPJ (only number)';
    }
  }

  getUrl(idGallery: string): string {
    let url = Constants.SERVICE_URL + Constants.SERVICE_PROJETC + 'company/companyImage/' + this.company.id + '/' + idGallery;
    return url;
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

  changeUploadedImages(images) {
    this.refresh();
  }

}
