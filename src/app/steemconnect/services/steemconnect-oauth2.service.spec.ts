import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { STEEMCONNECT_CONFIG } from '../config';
import { SteemconnectOAuth2Service, User } from './steemconnect-oauth2.service';

fdescribe('#SteemconnectModule SteemconnectOAuth2Service', () => {
  type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockCookieService: Partial<CookieService>;
  let mockDocument: DeepPartial<Document>;

  fdescribe('when there is no token in storage and the route is different than `/__/steemconnect`', () => {
    beforeEach(() => {
      mockDocument = {
        location: {
          origin: 'https://steeditor.app',
          href: 'https://steeditor.app/drafts'
        }
      };
      mockCookieService = {
        getObject: (name: string) => undefined,
        remove: (name: string) => undefined,
        putObject: (name: string, obj: Object, config: Object) => undefined
      };

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          SteemconnectOAuth2Service,
          {
            provide: STEEMCONNECT_CONFIG,
            useValue: {
              clientId: 'test.app',
              scope: ['comment', 'comment_options']
            }
          },
          {
            provide: CookieService,
            useValue: mockCookieService
          },
          {
            provide: DOCUMENT,
            useValue: mockDocument
          }
        ]
      });

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    it('#authState should be null', done =>
      inject(
        [SteemconnectOAuth2Service],
        (service: SteemconnectOAuth2Service) => {
          service.authState.pipe(first()).subscribe(authState => {
            expect(authState).toEqual(null);
            done();
          });
        }
      )());
  });

  fdescribe('when there is token in storage and the route is different than `/__/steemconnect`', () => {
    beforeEach(() => {
      mockDocument = {
        location: {
          origin: 'https://steeditor.app',
          href: 'https://steeditor.app/drafts'
        }
      };
      mockCookieService = {
        getObject: (name: string) => ({
          access_token: 'test.123',
          username: 'jakipatryk-dev',
          expires_in: 64000
        }),
        remove: (name: string) => undefined,
        putObject: (name: string, obj: Object, config: Object) => undefined
      };

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          SteemconnectOAuth2Service,
          {
            provide: STEEMCONNECT_CONFIG,
            useValue: {
              clientId: 'test.app',
              scope: ['comment', 'comment_options']
            }
          },
          {
            provide: CookieService,
            useValue: mockCookieService
          },
          {
            provide: DOCUMENT,
            useValue: mockDocument
          }
        ]
      });

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    it('#authState should eventually be an User object', done =>
      inject(
        [SteemconnectOAuth2Service],
        (service: SteemconnectOAuth2Service) => {
          const expectedUser: User = {
            uid: 'jakipatryk-dev',
            token: {
              access_token: 'test.123',
              username: 'jakipatryk-dev',
              expires_in: 64000
            }
          };

          service.authState.pipe(first(user => !!user)).subscribe(authState => {
            expect(authState).toEqual(expectedUser);
            done();
          });
        }
      )());
  });

  fdescribe('when there is no token in storage but the route is `/__/steemconnect` with token in query params', () => {
    beforeEach(() => {
      mockDocument = {
        location: {
          origin: 'https://steeditor.app',
          href:
            'https://steeditor.app/__/steemconnect?access_token=test.123&username=jakipatryk-dev&expires_in=64000'
        }
      };
      mockCookieService = {
        getObject: (name: string) => undefined,
        remove: (name: string) => undefined,
        putObject: (name: string, obj: Object, config: Object) => undefined
      };
      const mockActivatedRoute = {
        queryParams: of({
          access_token: 'test.123',
          username: 'jakipatryk-dev',
          expires_in: 64000
        })
      };

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          SteemconnectOAuth2Service,
          {
            provide: STEEMCONNECT_CONFIG,
            useValue: {
              clientId: 'test.app',
              scope: ['comment', 'comment_options']
            }
          },
          {
            provide: CookieService,
            useValue: mockCookieService
          },
          {
            provide: DOCUMENT,
            useValue: mockDocument
          },
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute
          }
        ]
      });

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    it('#authState should eventually be an User object', done =>
      inject(
        [SteemconnectOAuth2Service],
        (service: SteemconnectOAuth2Service) => {
          const expectedUser: User = {
            uid: 'jakipatryk-dev',
            token: {
              access_token: 'test.123',
              username: 'jakipatryk-dev',
              expires_in: 64000
            }
          };

          service.authState.pipe(first(user => !!user)).subscribe(authState => {
            expect(authState).toEqual(expectedUser);
            done();
          });
        }
      )());
  });
});
