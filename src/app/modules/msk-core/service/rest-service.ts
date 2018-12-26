import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JsonContainer} from "./json-container";
import {Constants} from "../../../utils/constants";
import {StorageUtils} from "../../../utils/storage-utils";


export class RestService {

  constructor(private http: HttpClient, private service: string, private storage: StorageUtils) {}

  executePost(urlSufix: string, data: any, callback: (result: JsonContainer, data: any) => void): void {

    var url = this.getUrl(urlSufix);

    var options = this.httpOptions();

    this.http.post(url, data, options).subscribe(resp => {

      if (callback != null) {
        callback(resp as JsonContainer, resp["data"])
      }
    });
  }

  executePostCustom(urlSufix: string, data: any) {

    let url = this.getUrl(urlSufix);

    let options = this.httpOptions();

    return this.http.post(url, data, options);
  }

  executeGet(urlSufix: string, callback: (result: JsonContainer, data: any) => void): void {

    var url = this.getUrl(urlSufix);

    var options = this.httpOptions();

    this.http.get(url, options).subscribe(resp => {

      if (callback != null) {
        callback(resp as JsonContainer, resp["data"])
      }
    });
  }

  executeGetUrl(url: string, callback: (result: JsonContainer, data: any) => void): void{

    this.http.get(url).subscribe(resp => {

      if(callback != null){
        callback(resp as JsonContainer, resp["data"])
      }
    });
  }

  private httpOptions(): {} {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.storage.getToken(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Access-Control-Allow-Headers, Accept, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true'
      })
    };
  }

  private getUrl(urlSufix: string): string {
    return Constants.SERVICE_URL + Constants.SERVICE_PROJETC + this.service + "/" + urlSufix;
  }
}
