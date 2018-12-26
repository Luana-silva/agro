import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {RackService} from '../rack/rack-service';
import {Rack} from '../rack/rack';
import {Company} from '../../../modules/msk-company/company/company';
import {CompanyService} from '../../../modules/msk-company/company/company-service';

declare var require: any;

@Component({
  selector: 'app-register-companies-page',
  templateUrl: './register-rack-page.component.html',
  styleUrls: ['./register-rack-page.component.scss'],
  providers: [
    RackService,
    CompanyService
  ]
})
export class RegisterRackPageComponent implements OnInit {

  companyOptions: Company[] ;

  rack: Rack;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private companyService: CompanyService,
              private rackService: RackService) {

    this.rack = new Rack();
    this.rack.company = new Company();

    this.route.params.subscribe(params => {
      this.rack.id = params['id'];
    });


    this.companyService.listActives((result, list) => {
      if(list != null) {
        this.companyOptions  = list;
      }
      // this.loadData();
    });

  }

  ngOnInit() {

    if(this.rack.id != null) {
      this.rackService.load(this.rack.id, (result, rack) => {
        if(rack != null) {
          this.rack = rack;
          }
        this.loadData();
      });
    } else {
      this.loadData()
    }
  }

  loadData() {

    if(this.rack.id == null) {
      this.rack = new Rack();

      this.navBarDataService.changePageTitle('New Rack')
    } else {
      this.navBarDataService.changePageTitle('Edit Rack')
    }

     this.form = new FormGroup({
       desc: new FormControl(this.rack.desc, [Validators.required]),
       sysid: new FormControl(this.rack.sysid, [Validators.required]),
       company: new FormControl(this.rack.company, [Validators.required])
     }, {updateOn: 'change'});
  }

  save() {

    if(this.form.valid){
      this.rackService.save(this.rack, (result, user) => {
        if (result.success){

          this.router.navigate(['list'], { relativeTo: this.route.parent });
        } else{
          console.log('não funfo');
        }
      });
    }
  }

}
