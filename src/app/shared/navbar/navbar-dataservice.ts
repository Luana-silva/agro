import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavBarDataService {

  private pageTitleSource = new BehaviorSubject<string>("default message");
  currentPageTitle = this.pageTitleSource.asObservable();

  constructor() { }

  changePageTitle(pageTitle: string) {
    this.pageTitleSource.next(pageTitle)
  }
}
