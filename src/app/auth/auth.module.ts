import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';

export interface SteemConnectConfig {
  clientId: string;
  scope: Array<string>;
  redirectUrl: string;
}

@NgModule({
  providers: [AuthService]
})
export class AuthModule {
  static forRoot(config: SteemConnectConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [{ provide: 'config', useValue: config }]
    };
  }
}
