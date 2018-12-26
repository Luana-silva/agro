import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../../modules/msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../../modules/msk-core/service/json-container";
import {Indication} from './indication';



@Injectable()
export class IndicationService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "indication", storageUtils);
  }

  save(indication: Indication, callback: (result: JsonContainer, indication: Indication) => void){
    this.executePost("save", indication, callback)
  }

  changeStatus(indication: Indication, callback: (result: JsonContainer, indication: Indication) => void){
    this.executePost("changeStatus", indication, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Indication[]) => void){
    this.executeGet("listAll", callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: Indication) => void){
    this.executeGet("load/" + id, callback)
  }
}
