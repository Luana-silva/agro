import {ChangeDetectorRef, Component, OnInit, ViewChild} from "@angular/core";
import {NavBarDataService} from "../../../shared/navbar/navbar-dataservice";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Contactus} from "../contactus/contactus";
import {ActivatedRoute, Router} from '@angular/router';
import {ContactusService} from "../contactus/contactus-service";
import {User} from "../../msk-user/user/user";
import {UserService} from "../../msk-user/user/user-service";

declare var require: any;

@Component({
  selector: 'app-register-contactus-page',
  templateUrl: './view-contactus-page.component.html',
  styleUrls: ['./view-contactus-page.component.scss'],
  providers: [
    ContactusService,
    UserService
  ]
})
export class ViewContactusPageComponent implements OnInit{

  contactus: Contactus;

  user: User;

  typeUser: string;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private userService: UserService,
              private contactusService: ContactusService) {

    this.contactus = new Contactus();
    this.user = new User();

    this.route.params.subscribe(params => {
      this.contactus.id = params['id'];
    });

    this.form = new FormGroup({}, {updateOn: 'change'});
  }

  ngOnInit() {

    if(this.contactus.id != null){
      this.contactusService.load(this.contactus.id, (result, contactus) => {
        if(contactus != null){
          this.contactus = contactus;
          this.loadUser(this.contactus.idUser);

        }
        this.loadData();
      });
    }
    else{
      this.loadData()
    }

  }

  loadData(){

    if(this.contactus.id == null){
      this.contactus = new Contactus();
    }

    this.navBarDataService.changePageTitle("Fale Conosco")
  }

  loadUser(idUser: string){

    this.userService.load(idUser, (result, data) => {
      if(data != null){
        this.user = data;

        if(this.user.type == "PARTNER"){
          this.typeUser = "Sócio";
        }else if(this.user.type == "EMPLOYEE"){
          this.typeUser = "Funcionário";
        }

      }
    });

  }

}
