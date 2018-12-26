import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../../modules/msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../../modules/msk-core/service/json-container";
import {Rack} from './rack';
import {Company} from '../../../modules/msk-company/company/company';



@Injectable()
export class RackService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "rack", storageUtils);
  }

  save(rack: Rack, callback: (result: JsonContainer, rack: Rack) => void){
    this.executePost("save", rack, callback)
  }

  changeStatus(rack: Rack, callback: (result: JsonContainer, rack: Rack) => void){
    this.executePost("changeStatus", rack, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Rack[]) => void){
    this.executeGet("listAll", callback)
  }

  load(id: number, callback: (result: JsonContainer, roles: Rack) => void){
    this.executeGet("load/" + id, callback)
  }
}
