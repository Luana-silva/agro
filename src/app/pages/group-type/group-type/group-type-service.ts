import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../../modules/msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../../modules/msk-core/service/json-container";
import {GroupType} from './group-type';
import {Rack} from '../../rack/rack/rack';



@Injectable()
export class GroupTypeService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "groupType", storageUtils);
  }

  save(groupType: GroupType, callback: (result: JsonContainer, groupType: GroupType) => void){
    this.executePost("save", groupType, callback)
  }

  changeStatus(groupType: GroupType, callback: (result: JsonContainer, groupType: GroupType) => void){
    this.executePost("changeStatus", groupType, callback)
  }

  listAll(callback: (result: JsonContainer, roles: GroupType[]) => void){
    this.executeGet("listAll", callback)
  }

  load(id: number, callback: (result: JsonContainer, roles: GroupType) => void){
    this.executeGet("load/" + id, callback)
  }
}
