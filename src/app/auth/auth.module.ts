import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

export interface SteemConnectConfig {
  clientId: string;
  scope: Array<string>;
  redirectUrl: string;
}

@NgModule({
  imports: [CommonModule],
  declarations: [],
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
