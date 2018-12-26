import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageUtils } from '../../utils/storage-utils';

@Injectable()
export class AuthService {
  token: string;
  roleId: string;
  idUser: string;
  idEvent: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  signinUser(email: string, password: string) {
    //your code for checking credentials and getting tokens for for signing in user
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'], { relativeTo: this.activatedRoute.parent});
  }

  logoutExpire() {
    localStorage.clear();
    this.router.navigate(['login'], { relativeTo: this.activatedRoute.parent, queryParams: { expired: true }});
  }

  getToken() {
    return localStorage.token
  }

  isAuthenticated() {
    return true;
    // return !!localStorage.token;
  }
}
