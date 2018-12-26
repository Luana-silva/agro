import { Component, Input, OnInit } from '@angular/core';
import { StorageUtils } from "../../utils/storage-utils";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import 'rxjs/add/operator/filter';
import { NavBarDataService } from "./navbar-dataservice";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    AuthService
  ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: NavBarDataService
  ) { }

  pageTitle: string;

  ngOnInit() {
    this.dataService.currentPageTitle.subscribe(pageTitle => this.pageTitle = pageTitle)
  }

  logout() {
    this.auth.logout();
  }
}
