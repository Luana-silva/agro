import {Injectable} from "@angular/core";


import {HttpClient} from "@angular/common/http";
import {RestService} from "../../msk-core/service/rest-service";
import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";
import {Company} from "./company";
import {PhotoUpload} from '../../msk-core/photo/photo-upload';
import {CompanySearch} from "./company-search";



@Injectable()
export class CompanyService extends RestService{

  constructor(private client: HttpClient, private storageUtils: StorageUtils){
    super(client, "companyExt", storageUtils);
  }

  save(company: Company, callback: (result: JsonContainer, company: Company) => void){
    this.executePost("save", company, callback)
  }

  saveCompanyImage(photoUpload: PhotoUpload, callback: (result: JsonContainer) => void){
    this.executePost("saveCompanyImage", photoUpload, callback)
  }

  saveMobile(company: Company, callback: (result: JsonContainer, company: Company) => void){
    this.executePost("saveMobile", company, callback)
  }

  changeStatus(company: Company, callback: (result: JsonContainer, company: Company) => void){
    this.executePost("changeStatus", company, callback)
  }

  listAll(callback: (result: JsonContainer, roles: Company[]) => void){
    this.executeGet("listAll", callback)
  }

  listPendingApprove(callback: (result: JsonContainer, roles: Company[]) => void){
    this.executeGet("listPendingApprove", callback)
  }

  listActives(callback: (result: JsonContainer, roles: Company[]) => void){
    this.executeGet("listActives", callback)
  }

  listActiveCards(callback: (result: JsonContainer, roles: Company[]) => void){
    this.executeGet("listActiveCards", callback)
  }

  returnAddress(cep: string, callback: (result: JsonContainer, roles: Company[]) => void){
    this.executeGetUrl("https://viacep.com.br/ws/" + cep + "/json" , callback)
  }

  search(companySearch: CompanySearch, callback: (result: JsonContainer, companyCards: Company[]) => void){
    this.executePost("search", companySearch, callback)
  }

  searchPartner(companySearch: CompanySearch){
    return this.executePostCustom("search", companySearch)
  }

  load(id: string, callback: (result: JsonContainer, roles: Company) => void){
    this.executeGet("load/" + id, callback)
  }
}


