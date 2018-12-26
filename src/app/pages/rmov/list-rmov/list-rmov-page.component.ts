import {Component, OnInit} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {ActivatedRoute, Router} from "@angular/router";
import {RmovService} from '../rmov/rmov-service';
import {CompanyService} from '../../../modules/msk-company/company/company-service';

declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
  selector: 'app-list-rmov-page',
  templateUrl: './list-rmov-page.component.html',
  styleUrls: ['./list-rmov-page.component.scss'],
  providers: [
    RmovService,
    CompanyService
  ]
})
export class ListRmovPageComponent implements OnInit{

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  // DataTable Content Titles
  columns = [
    { prop: 'name', name: 'Nome' },
    { prop: 'email', name: 'Email' },
    { prop: 'countPending', name: 'Quantity' }
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private rmovService: RmovService,
              private companyService: CompanyService,
              private navBarDataService: NavBarDataService) {

    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {

    // this.companyService.listByRmovPending((result, list) => {
    //   if(list != null){
    //     this.rows  = list;
    //   }
    //   // this.loadData();
    // });

    this.navBarDataService.changePageTitle("Process Rack - Search")
  }

 detail(row: any){
   this.router.navigate(['register', row.id], { relativeTo: this.route.parent });
  }

  newRmov(){
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }
}
