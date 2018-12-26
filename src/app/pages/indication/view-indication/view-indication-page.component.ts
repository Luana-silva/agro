import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Indication} from "../indication/indication";
import {ActivatedRoute, Router} from '@angular/router';
import {IndicationService} from "../indication/indication-service";

declare var require: any;

@Component({
  selector: 'app-register-indication-page',
  templateUrl: './view-indication-page.component.html',
  styleUrls: ['./view-indication-page.component.scss'],
  providers: [
    IndicationService
  ]
})
export class ViewIndicationsPageComponent implements OnInit{

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

    // this.form = new FormGroup({
    //   switchApprove: new FormControl(this.fgApprove),
    //   desc: new FormControl()
    // }, {updateOn: 'change'});
  }

  ngOnInit() {

    if(this.indication.id != null){
      this.indicationService.load(this.indication.id, (result, indication) => {
        if(indication != null){
          this.indication = indication;
        }
        this.loadData();
      });
    }
    else{
      this.loadData()
    }

  }

  loadData(){

    if(this.indication.id == null){
      this.indication = new Indication();
    }

    this.navBarDataService.changePageTitle("Indicação")
  }

  // save(){
  //
  //   console.log("ola");
  //   if(this.form.valid){
  //     console.log("ola")
  //     this.indicationService.saveMobile(this.indication, (result, indication) => {
  //       if(result.success){
  //
  //         this.router.navigate(['listConfirm'], { relativeTo: this.route.parent });
  //       }
  //       else{
  //         console.log("Error");
  //       }
  //     });
  //   }
  // }

}
