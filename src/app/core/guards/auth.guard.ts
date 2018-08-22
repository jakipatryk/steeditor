import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { SteemconnectOAuth2Service } from '../../steemconnect/services/steemconnect-oauth2.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: SteemconnectOAuth2Service,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.authState.pipe(
      map(authState => !!authState),
      tap(
        isAuthenticated =>
          isAuthenticated ? null : this.router.navigate(['/drafts'])
      ),
      first()
    );
  }

  canLoad(): Observable<boolean> {
    return this.authService.authState.pipe(
      map(authState => !!authState),
      tap(
        isAuthenticated =>
          isAuthenticated ? null : this.router.navigate(['/drafts'])
      ),
      first()
    );
  }
}
