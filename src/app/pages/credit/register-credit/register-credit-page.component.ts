import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {CreditService} from '../credit/credit-service';
import {Credit} from '../credit/credit';

declare var require: any;

@Component({
  selector: 'app-register-companies-page',
  templateUrl: './register-credit-page.component.html',
  styleUrls: ['./register-credit-page.component.scss'],
  providers: [
    CreditService
  ]
})
export class RegisterCreditPageComponent implements OnInit {

  credit: Credit;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private creditService: CreditService) {

    this.credit = new Credit();

    this.route.params.subscribe(params => {
      this.credit.id = params['id'];
    });

}

  ngOnInit() {

    if(this.credit.id != null) {
      this.creditService.load(this.credit.id, (result, credit) => {
        if(credit != null) {
          this.credit = credit;
          }
        this.loadData();
      });
    } else {
      this.loadData()
    }
  }

  loadData() {

    if(this.credit.id == null) {
      this.credit = new Credit();

      this.navBarDataService.changePageTitle('New Credit')
    } else {
      this.navBarDataService.changePageTitle('Edit Credit')
    }

     this.form = new FormGroup({
       desc: new FormControl(this.credit.desc, [Validators.required])
     }, {updateOn: 'change'});
  }

  save() {

    if(this.form.valid){
      this.creditService.save(this.credit, (result, user) => {
        if(result.success){

          this.router.navigate(['list'], { relativeTo: this.route.parent });
        } else{
          console.log('não funfo');
        }
      });
    }
  }

}
