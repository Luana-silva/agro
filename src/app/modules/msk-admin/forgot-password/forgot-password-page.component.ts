import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UserBService} from '../user-b/user-b-service';
import {StorageUtils} from '../../../utils/storage-utils';
import {TranslateService} from '@ngx-translate/core';
import {UserB} from '../user-b/user-b';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
  providers: [
    UserBService,
    StorageUtils
  ]
})

export class ForgotPasswordPageComponent {

  regularForm: FormGroup;

  emailError: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserBService,
              private translate: TranslateService,
              private storage: StorageUtils) {
  }

  // On submit click, reset form fields
  onSubmit() {

    var userB = new UserB();
    userB.email = (<HTMLInputElement>document.getElementById('email')).value

    if (this.regularForm.valid) {
      this.userService.forgotPassword(userB, (result) => {
      });
      window.location.href = 'pages/login';
    }
    // var userB = new UserB();
    // userB.email = (<HTMLInputElement>document.getElementById('email')).value
    //
    // if (this.regularForm.valid) {
    //   this.userService.forgotPassword(userB, (result, user) => {
    //     if (result.success) {
    //       this.storage.storeToken(user.token);
    //
    //       window.location.href = 'pages/login';
    //
    //     } else {
    //       this.translate.get(result.desc).subscribe((res: string) => {
    //         this.emailError = res
    //       });
    //     }
    //   });
    // }

  }

  ngOnInit() {
    this.regularForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    }, {updateOn: 'submit'});
  }

}
