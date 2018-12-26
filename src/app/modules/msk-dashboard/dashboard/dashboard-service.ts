import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {Dashboard} from './dashboard';
import {UserB} from '../../msk-admin/user-b/user-b';

@Injectable()
export class DashboardService extends RestService {


  constructor(private client: HttpClient, private storageUtils: StorageUtils) {
    super(client, "dashboard", storageUtils);
  }

  dashboardCompany(callback: (result: JsonContainer, roles: Dashboard) => void) {
    this.executeGet("dashboardCompany/"+ this.storageUtils.getIdCompany(), callback);

  }
  dashboardEvent(callback: (result: JsonContainer, roles: Dashboard) => void) {
    this.executeGet("dashboardEvent/" + this.storageUtils.getIdEvent(), callback)
  }

}

