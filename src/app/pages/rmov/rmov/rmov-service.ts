import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../../modules/msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../../modules/msk-core/service/json-container";
import {Rmov} from './rmov';
import {GroupRmov} from './groupRmov';



@Injectable()
export class RmovService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "rmov", storageUtils);
  }

  save(rmov: Rmov, callback: (result: JsonContainer, rmov: Rmov) => void){
    this.executePost("save", rmov, callback)
  }

  saveGroup(groupRmov: GroupRmov, callback: (result: JsonContainer, rmov: Rmov) => void){
    this.executePost("saveGroup", groupRmov, callback)
  }


  listPendingAnalysis(idCompany: number,callback: (result: JsonContainer, roles: Rmov[]) => void){
    this.executeGet("listPendingAnalysis/" + idCompany, callback)
  }

  load(id: number, callback: (result: JsonContainer, roles: Rmov) => void){
    this.executeGet("load/" + id, callback)
  }
}
