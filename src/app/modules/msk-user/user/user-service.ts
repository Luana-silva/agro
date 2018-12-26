import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {User} from "./user";
import {KeyAuth} from "../../msk-admin/user-b/key-auth";
import {UserB} from "../../msk-admin/user-b/user-b";



@Injectable()
export class UserService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "user", storageUtils);
  }

  save(user: User, callback: (result: JsonContainer, user: User) => void){
    this.executePost("save", user, callback)
  }

  changeStatus(user: User, callback: (result: JsonContainer, user: User) => void){
    this.executePost("changeStatus", user, callback)
  }

  listAll(callback: (result: JsonContainer, roles: User[]) => void){
    this.executeGet("listAll", callback)
  }

  listByCompany(idCompany: string, callback: (result: JsonContainer, roles: User[]) => void){
    this.executeGet("listByCompany/" + idCompany, callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: User) => void){
    this.executeGet("load/" + id, callback)
  }

  validateKey(KeyAuth: KeyAuth, callback: (result: JsonContainer, validated: boolean) => void){
    this.executePost("validateKey", KeyAuth, callback)
  }

  updatePassword(user: User, callback: (result: JsonContainer, user: User) => void){
    this.executePost("updatePassword", user, callback)
  }

}
