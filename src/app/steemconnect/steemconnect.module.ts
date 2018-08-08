import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SteemconnectConfig, STEEMCONNECT_CONFIG } from './config';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule()
export class SteemconnectModule {
  static forRoot(config: SteemconnectConfig): ModuleWithProviders {
    return {
      ngModule: SteemconnectModule,
      providers: [
        { provide: STEEMCONNECT_CONFIG, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    };
  }
}
