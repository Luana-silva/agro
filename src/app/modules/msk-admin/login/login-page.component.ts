import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UserB} from '../user-b/user-b';
import {UserBService} from '../user-b/user-b-service';
import {TranslateService} from '@ngx-translate/core';
import {StorageUtils} from '../../../utils/storage-utils';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [
    UserBService,
    StorageUtils
  ]
})
export class LoginPageComponent implements OnInit {

  regularForm: FormGroup;

  emailError: string = '';

  isExpired = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserBService,
              private translate: TranslateService,
              private storage: StorageUtils) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isExpired = params['expired'];
    });

    this.regularForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)])
    }, {updateOn: 'submit'});
  }

  // On submit button click
  onSubmit() {

    localStorage.clear();

    var userB = new UserB();
    userB.email = (<HTMLInputElement>document.getElementById('email')).value
    userB.password = (<HTMLInputElement>document.getElementById('password')).value

    if (this.regularForm.valid) {
      this.userService.authenticate(userB, (result, user) => {
        if (result.success) {
          this.storage.storeToken(user.token);
          this.storage.idUser(user.id);

          if (user.info != null && user.info.idEvent != null) {
            this.storage.idEvent(user.info.idEvent)
          } else if (user.info != null && user.info.idCompany != null) {
            this.storage.idCompany(user.info.idCompany)
          }

          this.storage.roleId(user.role.id);

          if (user.role != null && user.role.roles != null && user.role.roles.length > 0) {

            var urlHome = null;

            for (var i = 0; i < user.role.roles.length; i++) {
              if (user.role.roles[i].fgHome == true) {
                urlHome = user.role.roles[i].url;
                break;
              }
            }

            if (urlHome != null) {
              window.location.href = urlHome;
            }

          }
        } else {
          this.translate.get(result.desc).subscribe((res: string) => {
            this.emailError = res
          });
        }
      });
    }
  }

  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], {relativeTo: this.route.parent});
  }
}
