import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageUtils} from './utils/storage-utils';
import {NavBarDataService} from './shared/navbar/navbar-dataservice';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [StorageUtils, NavBarDataService]
})
export class AppComponent {

  constructor(public translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('pt-BR');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('pt-BR');
  }

   ngOnInit() {
    console.log(this.translate.currentLang);
  }
}
