import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: SteemconnectOAuth2Service) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.authState.pipe(
      map(authState => !!authState),
      first()
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.authState.pipe(
      map(authState => !!authState),
      first()
    );
  }
}
