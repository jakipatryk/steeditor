import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CookieModule } from 'ngx-cookie';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/containers/app/app.component';
import { CoreModule } from './core/core.module';
import { SteemconnectConfig } from './steemconnect/config';
import { SteemconnectModule } from './steemconnect/steemconnect.module';
import * as fromStore from './store';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    CoreModule.forRoot(),
    SteemconnectModule.forRoot(
      environment.steemConnectConfig as SteemconnectConfig
    ),
    AppRoutingModule,
    StoreModule.forRoot(fromStore.reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    EffectsModule.forRoot(fromStore.effects),
    CookieModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: fromStore.CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
