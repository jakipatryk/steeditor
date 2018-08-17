import { ModuleWithProviders, NgModule } from '@angular/core';
import { SteemRPCConfig, STEEM_RPC_CONFIG } from './config';

@NgModule()
export class SteemRPCModule {
  static forRoot(config: SteemRPCConfig): ModuleWithProviders {
    return {
      ngModule: SteemRPCModule,
      providers: [{ provide: STEEM_RPC_CONFIG, useValue: config }]
    };
  }
}
