import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {Category} from "./category";


@Injectable()
export class CategoryService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "category", storageUtils);
  }

  listAll(callback: (result: JsonContainer, roles: Category[]) => void){
    this.executeGet("listAll", callback)
  }

  load(id: number, callback: (result: JsonContainer, roles: Category) => void){
    this.executeGet("load/" + id, callback)
  }
}
