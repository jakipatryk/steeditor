import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { complement, isEmpty } from 'ramda';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, first, mapTo, switchMap, tap } from 'rxjs/operators';
import { SteemconnectConfig, STEEMCONNECT_CONFIG } from '../config';

export interface SteemconnectOAuth2TokenDetails {
  access_token: string;
  username: string;
  expires_in: number;
}

export interface User {
  token: SteemconnectOAuth2TokenDetails;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class SteemconnectOAuth2Service {
  public readonly steemconnectURL = 'https://steemconnect.com/';

  private authStateSubject = new BehaviorSubject<User | null>(null);

  /**
   * Observable of current auth state.
   * null if user is not signed in, an User object otherwise.
   */
  public get authState(): Observable<User | null> {
    return this.authStateSubject.asObservable();
  }

  private get authorizationURL(): string {
    const clientId = this.config.clientId;
    const redirectUrl = encodeURIComponent(
      `${this.document.location.origin}/__/steemconnect/redirect`
    );
    const scope = this.config.scope.join(',');
    return `${
      this.steemconnectURL
    }oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}`;
  }

  constructor(
    @Inject(STEEMCONNECT_CONFIG) private config: SteemconnectConfig,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private cookieService: CookieService,
    activatedRoute: ActivatedRoute,
    router: Router
  ) {
    if (!!this.getTokenFromStorage()) {
      this.authenticate(this.getTokenFromStorage());
    } else if (
      this.document.location.href.startsWith(
        `${this.document.location.origin}/__/steemconnect`
      )
    ) {
      activatedRoute.queryParams
        .pipe(
          first(complement(isEmpty)),
          tap(({ access_token, username, expires_in }) =>
            this.loginCallback({ access_token, username, expires_in })
          ),
          switchMap(() => router.navigate(['/']))
        )
        .subscribe();
    }
  }

  /**
   * Redirects user to SteemConnect auth provider.
   */
  public login(): void {
    this.document.location.href = this.authorizationURL;
  }

  /**
   * Logs out the current user.
   * Observable returns true if logging out succeeded, and false otherwise.
   */
  public logout(): Observable<boolean> {
    return this.http
      .post(`${this.steemconnectURL}api/oauth2/token/revoke`, null)
      .pipe(
        tap(() => this.removeTokenFromStorage()),
        mapTo(true),
        catchError(() => {
          return of(false);
        })
      );
  }

  private authenticate(token: SteemconnectOAuth2TokenDetails): void {
    this.authStateSubject.next({ token, uid: token.username });
  }

  private loginCallback(token: SteemconnectOAuth2TokenDetails): void {
    this.setTokenInStorage(token);
    this.authenticate(token);
  }

  private getTokenFromStorage(): SteemconnectOAuth2TokenDetails | undefined {
    return this.cookieService.getObject('sc-oauth2-token') as
      | SteemconnectOAuth2TokenDetails
      | undefined;
  }

  private removeTokenFromStorage(): void {
    this.cookieService.remove('sc-oauth2-token');
  }

  private setTokenInStorage(token: SteemconnectOAuth2TokenDetails): void {
    this.cookieService.putObject('sc-oauth2-token', token, {
      expires: new Date(Date.now() + token.expires_in * 1000)
    });
  }
}
