import {Component, OnInit} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupTypeService} from '../group-type/group-type-service';

declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
  selector: 'app-list-group-type-page',
  templateUrl: './list-group-type-page.component.html',
  styleUrls: ['./list-group-type-page.component.scss'],
  providers: [
    GroupTypeService
  ]
})
export class ListGroupTypePageComponent implements OnInit{

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
              private groupTypeService: GroupTypeService,
              private navBarDataService: NavBarDataService) {

    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {

  this.groupTypeService.listAll((result, groupType) => {
    if(groupType != null){
      this.rows  = groupType;
      }
    });

    this.navBarDataService.changePageTitle("Group Type - Search")
  }

  detail(row: any){
    //window.location.href = "pages/grouptype/register?id=" + row.id;
    this.router.navigate(['register', row.id], { relativeTo: this.route.parent });
  }

  newGroupType(){
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  delete(row: any){
    //changeStatus
    console.log(row.id);

    this.groupTypeService.changeStatus(row, (result, user) => {
      if(result.success){

        this.ngOnInit();
      }
      else{
        console.log("Error");
      }
    });
  }
}
