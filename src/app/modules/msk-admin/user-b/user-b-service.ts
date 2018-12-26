import {Injectable} from '@angular/core';

import {UserB} from './user-b';
import {JsonContainer} from '../../msk-core/service/json-container';
import {HttpClient} from '@angular/common/http';
import {RestService} from '../../msk-core/service/rest-service';
import {StorageUtils} from '../../../utils/storage-utils';
import {Role} from '../role/role';
import {KeyAuth} from './key-auth';


@Injectable()
export class UserBService extends RestService {

  constructor(private client: HttpClient, private storageUtils: StorageUtils) {
    super(client, 'userBackoffice', storageUtils);
  }

  authenticate(userB: UserB, callback: (result: JsonContainer, user: UserB) => void) {
    this.executePost('authenticateMobile', userB, callback)
  }

  forgotPassword(userB: UserB, callback: (result: JsonContainer) => void) {
    this.executePostCustom('forgotPassword/' + userB.email, callback)
  }

  updatePasswordForgot(userB: UserB, callback: (result: JsonContainer, user: UserB) => void) {
    this.executePost('updatePasswordForgot', userB, callback)
  }

  validateKey(KeyAuth: KeyAuth, callback: (result: JsonContainer, validated: boolean) => void) {
    this.executePost('validateKey', KeyAuth, callback)
  }

  menu(callback: (result: JsonContainer, roles: Role[]) => void) {
    this.executeGet('menu', callback)
  }
}
