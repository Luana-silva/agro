import {Component, OnInit} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {ActivatedRoute, Router} from "@angular/router";
import {CreditService} from '../credit/credit-service';

declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
  selector: 'app-list-group-type-page',
  templateUrl: './list-credit-page.component.html',
  styleUrls: ['./list-credit-page.component.scss'],
  providers: [
    CreditService
  ]
})
export class ListCreditPageComponent implements OnInit{

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  // DataTable Content Titles
  columns = [
    { prop: 'desc', name: 'Name' },
    { prop: 'company.name', name: 'Company' }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private creditService: CreditService,
              private navBarDataService: NavBarDataService) {

    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {

  this.creditService.listAll((result, credit) => {
    if(credit != null){
      this.rows  = credit;
      }
    });

    this.navBarDataService.changePageTitle("Credit")
  }

  detail(row: any){
    //window.location.href = "pages/credit/register?id=" + row.id;
    this.router.navigate(['register', row.id], { relativeTo: this.route.parent });
  }

  newCredit(){
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  delete(row: any){
    //changeStatus
    console.log(row.id);

    this.creditService.changeStatus(row, (result, user) => {
      if(result.success){

        this.ngOnInit();
      }
      else{
        console.log("Error");
      }
    });
  }
}
