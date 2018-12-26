import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NavBarDataService} from '../../../shared/navbar/navbar-dataservice';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../user/user-service';

declare var require: any;

@Component({
  selector: 'app-register-user-page',
  templateUrl: './register-user-page.component.html',
  styleUrls: ['./register-user-page.component.scss'],
  providers: [
    UserService
  ]
})
export class RegisterUserPageComponent implements OnInit {

  newEdit: string;

  lblCPFCNPJ: string;

  user: User;

  @ViewChild('vform') validationForm: FormGroup;
  form: FormGroup;

  constructor(private router: Router,
              private navBarDataService: NavBarDataService,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.user = new User();

    this.route.params.subscribe(params => {
      this.user.id = params['id'];
    });
  }

  ngOnInit() {

    if (this.user.id != null) {
      this.userService.load(this.user.id, (result, user) => {
        if (user != null) {
          this.user = user;
          //this.user.name = name;
        }
        this.loadData();
      });
    }
    else {
      this.loadData()
    }
  }

  loadData() {

    if (this.user.id == null) {
      this.user = new User();

      this.navBarDataService.changePageTitle('Usuário');
      this.newEdit = 'New Client';
    }
    else {

      this.navBarDataService.changePageTitle('Usuário')
      this.newEdit = 'Edit - ' + this.user.name;
    }

    this.form = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required])
    }, {updateOn: 'change'});
  }

  save() {

    if (this.form.valid) {
      this.userService.save(this.user, (result, user) => {
        if (result.success) {

          this.router.navigate(['list'], {relativeTo: this.route.parent});
        }
        else {
          console.log('Error');
        }
      });
    }
  }

}
