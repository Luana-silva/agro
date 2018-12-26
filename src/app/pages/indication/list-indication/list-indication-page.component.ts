import {Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {ActivatedRoute, Router} from "@angular/router";
import {IndicationService} from '../indication/indication-service';
import {DatatableComponent} from "@swimlane/ngx-datatable";

declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
  selector: 'app-list-group-type-page',
  templateUrl: './list-indication-page.component.html',
  styleUrls: ['./list-indication-page.component.scss'],
  providers: [
    IndicationService
  ]
})
export class ListIndicationPageComponent implements OnInit{

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  // DataTable Content Titles
  columns = [
    { prop: 'desc', name: 'Name' },
    { prop: 'company.name', name: 'Company' }
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private indicationService: IndicationService,
              private navBarDataService: NavBarDataService) {

    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  ngOnInit() {

  this.indicationService.listAll((result, indication) => {
    if(indication != null){
      this.rows  = indication;
      this.temp = [...indication];
      }
    });

    this.navBarDataService.changePageTitle("Indicação")
  }

  detail(row: any){
    //window.location.href = "pages/indication/register?id=" + row.id;
    this.router.navigate(['register', row.id], { relativeTo: this.route.parent });
  }

  newIndication(){
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  view(row: any){
    this.router.navigate(['view', row.id], { relativeTo: this.route.parent });
  }

  delete(row: any){
    //changeStatus
    console.log(row.id);

    this.indicationService.changeStatus(row, (result, user) => {
      if(result.success){

        this.ngOnInit();
      }
      else{
        console.log("Error");
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {

      //return d.fantasyName.toLowerCase().indexOf(val) !== -1 || !val;
      return (d.nameUser.toLowerCase().indexOf(val) !== -1);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
