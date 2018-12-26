import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {UserB} from '../user-b/user-b';
import {UserBService} from '../user-b/user-b-service';
import {TranslateService} from '@ngx-translate/core';
import {StorageUtils} from '../../../utils/storage-utils';
import {KeyAuth} from '../user-b/key-auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './email-forgot-password-userb-page.component.html',
  styleUrls: ['./email-forgot-password-userb-page.component.scss'],
  providers: [
    UserBService,
    StorageUtils
  ]
})
export class EmailForgotPasswordUserbPageComponent implements OnInit {

  regularForm: FormGroup;

  emailError: string = '';

  isAuth: boolean = true;

  keyAuth: KeyAuth;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserBService,
              private translate: TranslateService) {

    this.route.queryParams.subscribe(params => {

      this.keyAuth = new KeyAuth();

      this.keyAuth.idUser = params['u'];
      this.keyAuth.key = params['k'];
      this.keyAuth.type = params['t'];

      this.regularForm = new FormGroup({
        passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(24)])
      }, {updateOn: 'submit'});

    });
  }

  ngOnInit() {

    if (this.keyAuth.idUser != null) {

      this.userService.validateKey(this.keyAuth, (result, validated) => {
        if (validated) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      });
    }
  }

  // On submit button click
  onSubmit() {

    var password = (<HTMLInputElement>document.getElementById('password')).value;
    var passwordConfirm = (<HTMLInputElement>document.getElementById('passwordConfirm')).value

    if (password == '' || passwordConfirm == '') {
      this.emailError = 'Os campos de senha são obrigatórios';
    } else if (password.length < 6) {
      this.emailError = 'A senha deve ter no mínimo 6 caracteres';
    } else if (password != passwordConfirm) {
      this.emailError = 'Senhas não estão iguais';
    } else {

      var userB = new UserB();
      userB.id = this.keyAuth.idUser;
      userB.password = password;

      this.userService.updatePasswordForgot(userB, (result, user) => {
        if (result.success) {
          this.router.navigate(['login'], {relativeTo: this.route.parent});

        } else {
          this.translate.get(result.desc).subscribe((res: string) => {

            if (res == 'email_already_registred') {
              this.emailError = 'Este email já foi cadastrado';
            } else {
              this.emailError = res
            }

          });
        }
      });
    }
  }

}
