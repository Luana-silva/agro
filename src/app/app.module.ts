
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { CleanLayoutComponent } from "./layouts/clean/clean-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';

// import * as $ from 'jquery';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MSKAdminModule } from "./modules/msk-admin/msk-admin.module";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgxMaskModule } from "ngx-mask";
import { EventAutoCompleteService } from "./modules/msk-event/event/event-auto-complete.service";
import { TokenInterceptor } from './shared/auth/token.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({

  declarations: [
    AppComponent,
    FullLayoutComponent,
    CleanLayoutComponent,
    ContentLayoutComponent

  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule.forRoot(),
    SharedModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MSKAdminModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    EventAutoCompleteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
