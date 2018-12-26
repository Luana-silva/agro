import {Component, Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {CompanyService} from "../../msk-company/company/company-service";
import {CompanySearch} from "../../msk-company/company/company-search";
import {Constants} from "../../../utils/constants";

import {StorageUtils} from "../../../utils/storage-utils";
import {JsonContainer} from "../../msk-core/service/json-container";

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class EventAutoCompleteService {

  public data_load1: any;
  public dataLoad: Object;
  public temp: any;
  public companySearch: CompanySearch;
  private service: string;
  results: Object;

  constructor(private http: HttpClient, private companyService: CompanyService) {
  }

  public search(term: string) {
    if (term === '') {
      return of([]);
    }

    this.companySearch = new CompanySearch();
    this.companySearch.queryString = term;
    // this.companySearch.idCategory = null;
    // this.companySearch.idUser = null;
    // this.companySearch.city = null;
    this.companySearch.page = 1;

    return this.companyService.searchPartner(this.companySearch)
      .pipe(
        map(response => {
          return response["data"]
          //return response["data"].map(response2 => response2.name)
        }),
      );

  }

}
