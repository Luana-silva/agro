import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../../modules/msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../../modules/msk-core/service/json-container";
import {Credit} from './credit';



@Injectable()
export class CreditService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "credit", storageUtils);
  }

  save(credit: Credit, callback: (result: JsonContainer, credit: Credit) => void){
    this.executePost("save", credit, callback)
  }

  changeStatus(credit: Credit, callback: (result: JsonContainer, credit: Credit) => void){
    this.executePost("changeStatus", credit, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Credit[]) => void){
    this.executeGet("listAll", callback)
  }

  load(id: number, callback: (result: JsonContainer, roles: Credit) => void){
    this.executeGet("load/" + id, callback)
  }
}
