import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CookieModule } from 'ngx-cookie';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/containers/app/app.component';
import { CoreModule } from './core/core.module';
import { SteemRPCModule } from './steem-rpc/steem-rpc.module';
import { SteemconnectConfig } from './steemconnect/config';
import { SteemconnectModule } from './steemconnect/steemconnect.module';
import { RootStoreModule } from './store/root-store.module';

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
    SteemRPCModule.forRoot({
      node: 'https://api.steemit.com'
    }),
    AppRoutingModule,
    RootStoreModule,
    CookieModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
