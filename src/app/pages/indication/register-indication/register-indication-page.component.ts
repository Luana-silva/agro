import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {IndicationService} from '../indication/indication-service';
import {Indication} from '../indication/indication';

declare var require: any;

@Component({
  selector: 'app-register-companies-page',
  templateUrl: './register-indication-page.component.html',
  styleUrls: ['./register-indication-page.component.scss'],
  providers: [
    IndicationService
  ]
})
export class RegisterIndicationPageComponent implements OnInit {

  indication: Indication;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private indicationService: IndicationService) {

    this.indication = new Indication();

    this.route.params.subscribe(params => {
      this.indication.id = params['id'];
    });

}

  ngOnInit() {

    if(this.indication.id != null) {
      this.indicationService.load(this.indication.id, (result, indication) => {
        if(indication != null) {
          this.indication = indication;
          }
        this.loadData();
      });
    } else {
      this.loadData()
    }
  }

  loadData() {

    if(this.indication.id == null) {
      this.indication = new Indication();

      this.navBarDataService.changePageTitle('New Indication')
    } else {
      this.navBarDataService.changePageTitle('Edit Indication')
    }

     // this.form = new FormGroup({
     //   desc: new FormControl(this.indication.desc, [Validators.required])
     // }, {updateOn: 'change'});
  }

  save() {

    // if(this.form.valid){
    //   this.indicationService.save(this.indication, (result, user) => {
    //     if(result.success){
    //
    //       this.router.navigate(['list'], { relativeTo: this.route.parent });
    //     } else{
    //       console.log('não funfo');
    //     }
    //   });
    // }
  }

}
