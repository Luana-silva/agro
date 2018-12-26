import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {Reports} from "./reports";
import {PhotoUpload} from '../../msk-core/photo/photo-upload';



@Injectable()
export class ReportsService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "report", storageUtils);
  }

  save(reports: Reports, callback: (result: JsonContainer, reports: Reports) => void){
    this.executePost("save", reports, callback)
  }

  saveImage(photoUpload: PhotoUpload, callback: (result: JsonContainer) => void){
    this.executePost("saveImage", photoUpload, callback)
  }

  saveMobile(reports: Reports, callback: (result: JsonContainer, reports: Reports) => void){
    this.executePost("saveMobile", reports, callback)
  }

  updateFile(reports: Reports, callback: (result: JsonContainer, reports: Reports) => void) {
    this.executePost("updateFile", reports, callback)
  }

  newUser(reports: Reports, callback: (result: JsonContainer, reports: Reports) => void){
    this.executePost("newUser", reports, callback)
  }

  uploadFile(reports: Reports, callback: (result: JsonContainer, reports: Reports) => void){
    this.executePost("uploadFile", reports, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Reports[]) => void){
    this.executeGet("listFiles", callback)
  }

  listPendingApprove(callback: (result: JsonContainer, roles: Reports[]) => void){
    this.executeGet("listPendingApprove", callback)
  }

  listActives(callback: (result: JsonContainer, roles: Reports[]) => void){
    this.executeGet("listActives", callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: Reports) => void){
    this.executeGet("load/" + id, callback)
  }
}

