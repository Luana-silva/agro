import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {RmovService} from '../rmov/rmov-service';
import {Rmov} from '../rmov/rmov';
import {CompanyService} from '../../../modules/msk-company/company/company-service';
import {GroupRmov} from '../rmov/groupRmov';
import {forEach} from '@angular/router/src/utils/collection';

declare var require: any;

@Component({
  selector: 'app-register-companies-page',
  templateUrl: './register-rmov-page.component.html',
  styleUrls: ['./register-rmov-page.component.scss'],
  providers: [
    RmovService
  ]
})
export class RegisterRmovPageComponent implements OnInit {
  idCompany : number;
  groupRmov: GroupRmov;
  rows = [];
  editing = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  count: number;

  // DataTable Content Titles
  columns = [
    { prop: 'name', name: 'Nome' },
    { prop: 'email', name: 'Email' },
    { prop: 'countPending', name: 'Quantity' }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rmovService: RmovService,
              private navBarDataService: NavBarDataService) {

    this.groupRmov = new GroupRmov();
    this.groupRmov.listRmov = [];

    this.route.params.subscribe(params => {
      this.idCompany = params['id'];
    });

    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {

    this.rmovService.listPendingAnalysis(this.idCompany, (result, list) => {
      if(list != null){
        this.rows  = list;
      }
    });

    this.navBarDataService.changePageTitle("Process Rack")
  }

  save() {

    if(this.editing.length > 0){

      for(this.count = 0; this.count < this.editing.length; this.count ++){

        if(this.editing[this.count] != null){
          this.groupRmov.listRmov.push(this.editing[this.count]);
        }
      }

      this.rmovService.saveGroup(this.groupRmov, (result, user) => {
        if(result.success){

          this.router.navigate(['list'], { relativeTo: this.route.parent });
        } else{
          console.log('não funfo');
        }
      });
    }else{
      this.router.navigate(['list'], { relativeTo: this.route.parent });
    }
  }

  // Editing content code
  updateValue(event, cell, rowIndex) {

    console.log('não funfo');

    this.rows[rowIndex][cell] = event.target.value;
    this.editing[rowIndex] = this.rows[rowIndex];

    console.log('não funfo');
  }

}
