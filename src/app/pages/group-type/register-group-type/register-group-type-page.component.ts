import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {GroupTypeService} from '../group-type/group-type-service';
import {GroupType} from '../group-type/group-type';

declare var require: any;

@Component({
  selector: 'app-register-companies-page',
  templateUrl: './register-group-type-page.component.html',
  styleUrls: ['./register-group-type-page.component.scss'],
  providers: [
    GroupTypeService
  ]
})
export class RegisterGroupTypePageComponent implements OnInit {

  groupType: GroupType;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private groupTypeService: GroupTypeService) {

    this.groupType = new GroupType();

    this.route.params.subscribe(params => {
      this.groupType.id = params['id'];
    });

}

  ngOnInit() {

    if(this.groupType.id != null) {
      this.groupTypeService.load(this.groupType.id, (result, groupType) => {
        if(groupType != null) {
          this.groupType = groupType;
          }
        this.loadData();
      });
    } else {
      this.loadData()
    }
  }

  loadData() {

    if(this.groupType.id == null) {
      this.groupType = new GroupType();

      this.navBarDataService.changePageTitle('New GroupType')
    } else {
      this.navBarDataService.changePageTitle('Edit GroupType')
    }

     this.form = new FormGroup({
       desc: new FormControl(this.groupType.desc, [Validators.required])
     }, {updateOn: 'change'});
  }

  save() {

    if(this.form.valid){
      this.groupTypeService.save(this.groupType, (result, user) => {
        if(result.success){

          this.router.navigate(['list'], { relativeTo: this.route.parent });
        } else{
          console.log('não funfo');
        }
      });
    }
  }

}
