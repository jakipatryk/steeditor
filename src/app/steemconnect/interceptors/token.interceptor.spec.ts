import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SteemconnectOAuth2Service } from '../services/steemconnect-oauth2.service';
import { TokenInterceptor } from './token.interceptor';

@Injectable()
class TestService {
  constructor(private http: HttpClient) {}

  public callToSteemconnect(): Observable<any> {
    return this.http.get('https://steemconnect.com/api/broadcast');
  }

  callNotToSteemconnect(): Observable<any> {
    return this.http.get('https://not-steemconnect.com/test');
  }
}

fdescribe('#SteemconnectModule TokenInterceptor', () => {
  let service: TestService;
  let httpMock: HttpTestingController;
  let oauth2ServiceMock: Partial<SteemconnectOAuth2Service>;

  beforeEach(() => {
    oauth2ServiceMock = {
      authState: of({
        uid: 'jakipatryk-dev',
        token: {
          access_token: 'test.123',
          username: 'jakipatryk-dev',
          expires_in: 64000
        }
      }),
      steemconnectURL: 'https://steemconnect.com/'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TestService,
        {
          provide: SteemconnectOAuth2Service,
          useValue: oauth2ServiceMock
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        }
      ]
    });

    service = TestBed.get(TestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header with access token if call is made to Steemconnect', () => {
    service.callToSteemconnect().subscribe();

    const httpRequest = httpMock.expectOne(
      'https://steemconnect.com/api/broadcast'
    );

    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Bearer test.123'
    );
    httpMock.verify();
  });

  it('should NOT add an Authorization header if call is made NOT to Steemconnect', () => {
    service.callNotToSteemconnect().subscribe();

    const httpRequest = httpMock.expectOne('https://not-steemconnect.com/test');

    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
    httpMock.verify();
  });
});
