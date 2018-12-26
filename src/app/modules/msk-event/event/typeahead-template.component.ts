import {Component} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

import {CompanyService} from "../../msk-company/company/company-service";
import {EventAutoCompleteService} from "./event-auto-complete.service";


@Component({
  selector: 'ngbd-typeahead-http',
  templateUrl: './typeahead-template.component.html',
  providers: [EventAutoCompleteService, CompanyService],
  styles: [`.form-control {
    width: 300px;
    display: inline;
  }`]
})
export class NgbdTypeaheadHttp {
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: EventAutoCompleteService) {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    );
    formatter = (x: {name: string}) => x.name;
}
