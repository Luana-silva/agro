import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { Router, ActivatedRoute } from "@angular/router";
import {UserBService} from "../../modules/msk-admin/user-b/user-b-service";
import {StorageUtils} from "../../utils/storage-utils";
import {RouteInfo} from "./sidebar.metadata";

declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [
      UserBService,
      StorageUtils
    ]
})

export class SidebarComponent implements OnInit {

    public menuItems: any[];

    constructor(private router: Router,
        private route: ActivatedRoute,
        private userBService: UserBService,
        private storage: StorageUtils) {
    }

    ngOnInit() {

        if(this.storage.getToken() == null){
            window.location.href = 'pages/login';
        }

        this.userBService.menu((result, roles) => {

          if(roles != null){

            var routes: RouteInfo[] = [];

            for(var i=0; i<roles.length; i++){
              routes.push({
                path: roles[i].url,
                title: roles[i].name,
                icon: roles[i].icon,
                class: '',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                submenu: []
              })
            }
          }

          $.getScript('./assets/js/app-sidebar.js');
          // this.menuItems = ROUTES.filter(menuItem => menuItem);
          this.menuItems = routes
        });
    }
}
