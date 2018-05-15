import { SteemConnectConfig } from './../auth.module';
import { Injectable, Inject } from '@angular/core';

export interface OAuth2Token {
  access_token: string;
  username: string;
  expires_in: number;
}

@Injectable()
export class AuthService {
  constructor(@Inject('config') private config: SteemConnectConfig) {}

  /**
   * Gets authorization URL based on config provided in `forRoot` of the AuthModule.
   */
  getAuthorizationUrl(): string {
    const base = 'https://steemconnect.com/oauth2/authorize?';
    const clientId = this.config.clientId;
    const redirectUrl = encodeURIComponent(this.config.redirectUrl);
    const scope = this.config.scope.join(',');
    return `${base}client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}`;
  }

  /**
   * Sets a `access_token` cookie.
   */
  setCookie(token: OAuth2Token): OAuth2Token {
    document.cookie = `access_token=${token.access_token};max-age=${
      token.expires_in
    }`;
    return token;
  }

  /**
   * Gets a `access_token` from cookies (if exists, otherwise returns undefined).
   */
  getCookie(): string | undefined {
    return document.cookie.match(/access_token=([^;]+)/)[1];
  }
}
