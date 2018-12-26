import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {Event} from "./event";
import {PhotoUpload} from '../../msk-core/photo/photo-upload';



@Injectable()
export class EventService extends RestService {

  constructor(private client: HttpClient, private storageUtils: StorageUtils) {
    super(client, "event", storageUtils);
  }

  save(event: Event, callback: (result: JsonContainer, event: Event) => void) {
    this.executePost("save", event, callback)
  }

  saveImage(photoUpload: PhotoUpload, callback: (result: JsonContainer) => void) {
    this.executePost("saveImage", photoUpload, callback)
  }

  saveMobile(event: Event, callback: (result: JsonContainer, event: Event) => void) {
    this.executePost("saveMobile", event, callback)
  }

  changeStatus(event: Event, callback: (result: JsonContainer, event: Event) => void) {
    this.executePost("changeStatus", event, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Event[]) => void) {
    this.executeGet("listAll", callback)
  }

  listPendingApprove(callback: (result: JsonContainer, roles: Event[]) => void) {
    this.executeGet("listPendingApprove", callback)
  }

  listActives(callback: (result: JsonContainer, roles: Event[]) => void) {
    this.executeGet("listActives", callback)
  }

  load(id: string, callback: (result: JsonContainer, roles: Event) => void) {
    this.executeGet("load/" + id, callback)
  }
}

