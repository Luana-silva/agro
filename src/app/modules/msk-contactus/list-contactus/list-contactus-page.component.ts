import {Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactusService} from "../contactus/contactus-service";
import {Contactus} from '../contactus/contactus';
import {DatatableComponent} from "@swimlane/ngx-datatable";

declare var require: any;

@Component({
  selector: 'app-list-contactus-page',
  templateUrl: './list-contactus-page.component.html',
  styleUrls: ['./list-contactus-page.component.scss'],
  providers: [
    ContactusService
  ]
})
export class ListContactusPageComponent implements OnInit{

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  urlApprove: boolean;
  reorderable: boolean = true;

  // DataTable Content Titles
  columns = [
    { prop: 'name', name: 'Nome' },
    { prop: 'email', name: 'Email' },
    { prop: 'Contactus', name: 'Contactus' }
  ];

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactusService: ContactusService,
              private navBarDataService: NavBarDataService) {

    setTimeout(() => { this.loadingIndicator = false; }, 1500 );
  }

  ngOnInit() {

    this.contactusService.listAll((result, list) => {
      if(list != null){
        this.rows  = list;
        this.temp = [...list];
      }
    });

    this.navBarDataService.changePageTitle("Fale Conosco")
  }


  detail(row: any){
    this.router.navigate(['register', row.id], { relativeTo: this.route.parent });
  }

  view(row: any){
    if(this.urlApprove){
      this.router.navigate(['viewConfirm', row.id], { relativeTo: this.route.parent });
    }else{
      this.router.navigate(['view', row.id], { relativeTo: this.route.parent });
    }

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return (d.typeContactUs.name.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;
  }

}
