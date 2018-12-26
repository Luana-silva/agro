import {Component, OnInit} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {ActivatedRoute, Router} from "@angular/router";
import {RackService} from "../rack/rack-service";
import {Rack} from '../rack/rack';

declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
  selector: 'app-list-rack-page',
  templateUrl: './list-rack-page.component.html',
  styleUrls: ['./list-rack-page.component.scss'],
  providers: [
    RackService
  ]
})
export class ListRackPageComponent implements OnInit{

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
              private rackService: RackService,
              private navBarDataService: NavBarDataService) {

    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {

  this.rackService.listAll((result, rack) => {
    if(rack != null){
      this.rows  = rack;
      }
    });

    this.navBarDataService.changePageTitle("Rack - Search")
  }

  detail(row: any){
    this.router.navigate(['register', row.id], { relativeTo: this.route.parent });
  }

  newRack(){
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  delete(row: any){
    //changeStatus
    console.log(row.id);

    this.rackService.changeStatus(row, (result, user) => {
      if(result.success){

        this.ngOnInit();
      }
      else{
        console.log("Error");
      }
    });
  }
}
