import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  routerReducer,
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { AuthStoreModule } from './auth-store';
import { DraftsStoreModule } from './drafts-store';
import { RouterEffects } from './router-store/effects';
import { CustomSerializer } from './router-store/serializer';

@NgModule({
  imports: [
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    }),
    AuthStoreModule,
    DraftsStoreModule
  ],
  providers: [
    RouterEffects,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ]
})
export class RootStoreModule {}
