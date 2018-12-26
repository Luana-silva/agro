import {Component, OnInit} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user/user-service';
import {User} from '../user/user';

declare var require: any;

//const data: any = require('app/shared/data/user.json');

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.scss'],
  providers: [
    UserService
  ]
})
export class ListUsersPageComponent implements OnInit {

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  // DataTable Content Titles
  columns = [
    {prop: 'name', name: 'Nome'},
    {prop: 'email', name: 'Email'},
    {prop: 'User', name: 'User'}
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private navBarDataService: NavBarDataService) {
    //this.rows = data;

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }

  ngOnInit() {

    this.userService.listAll((result, list) => {
      if (list != null) {
        this.rows = list;
      }
    });

//    this.rows = data;
    this.navBarDataService.changePageTitle('Companhia')
  }


  newUser() {
    this.router.navigate(['register'], {relativeTo: this.route.parent});
  }


  detail(row: any) {
    this.router.navigate(['register', row.id], {relativeTo: this.route.parent});
  }

  view(row: any) {
    this.router.navigate(['view', row.id], {relativeTo: this.route.parent});
  }


  delete(row: any) {
    //changeStatus

    this.userService.changeStatus(row, (result, user) => {
      if (result.success) {

        this.ngOnInit();
      }
      else {
        console.log('Error');
      }
    });
  }
}
