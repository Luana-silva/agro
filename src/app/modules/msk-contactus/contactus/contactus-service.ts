import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {Contactus} from "./contactus";



@Injectable()
export class ContactusService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "contactUs", storageUtils);
  }

  save(contactus: Contactus, callback: (result: JsonContainer, contactus: Contactus) => void){
    this.executePost("save", contactus, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Contactus[]) => void){
    this.executeGet("listAll", callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: Contactus) => void){
    this.executeGet("load/" + id, callback)
  }
}
