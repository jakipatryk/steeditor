import { SteemPost } from './../../../core/SteemPost';
import { STEEM_RPC_CONFIG } from './../config';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { SteemRPCService } from './steem-rpc.service';

fdescribe('#SteemRPCModule SteemRPCService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SteemRPCService,
        {
          provide: STEEM_RPC_CONFIG,
          useValue: {
            node: 'https://api.steemit.com'
          }
        }
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject(
    [SteemRPCService],
    (service: SteemRPCService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('#call should make a POST request with correct body to correct URL', inject(
    [SteemRPCService],
    (service: SteemRPCService) => {
      service.call('api', 'method', []).subscribe();
      const req = httpTestingController.expectOne('https://api.steemit.com');

      expect(req.request.method).toEqual('POST');
      expect(req.request.url).toEqual('https://api.steemit.com');
      expect(req.request.body).toEqual({
        jsonrpc: '2.0',
        id: 1,
        method: 'api.method',
        params: []
      });
    }
  ));

  it('#call should map response to `result` prop', inject(
    [SteemRPCService],
    (service: SteemRPCService) => {
      service
        .call('api', 'method', [])
        .subscribe(res => expect(res).toEqual([{ test: 123 }]));

      const req = httpTestingController.expectOne('https://api.steemit.com');
      req.flush({
        jsonrpc: '2.0',
        id: 1,
        result: [{ test: 123 }]
      });
    }
  ));

  it('#call should throw is response contains `error` prop', inject(
    [SteemRPCService],
    (service: SteemRPCService) => {
      service
        .call('api', 'method', [])
        .subscribe(() => fail('should have thrown'), err => expect(err).toBeDefined());

      const req = httpTestingController.expectOne('https://api.steemit.com');
      req.flush({
        jsonrpc: '2.0',
        id: 1,
        error: {message: 'error!'}
      });
    }
  ));

  it('#getUserPosts should return an array of user own posts (response without reblogs)', inject(
    [SteemRPCService],
    (service: SteemRPCService) => {
      const posts = [
        {
          comment: {
            author: 'jakipatryk',
            body: '123'
          },
          blog: 'jakipatryk',
          reblog_on: '1970-01-01T00:00:00',
          entry_id: 103
        },
        {
          comment: {
            author: 'jakipatryk',
            body: '123'
          },
          blog: 'jakipatryk',
          reblog_on: '1970-01-01T00:00:00',
          entry_id: 102
        },
        {
          comment: {
            author: 'jakipatryk',
            body: '123'
          },
          blog: 'jakipatryk',
          reblog_on: '1970-01-01T00:00:00',
          entry_id: 101
        }
      ];

      service
        .getUserPosts('jakipatryk', 3)
        .subscribe(res => expect(res.posts).toEqual(posts));

      const req = httpTestingController.expectOne('https://api.steemit.com');
      req.flush({
        jsonrpc: '2.0',
        id: 1,
        result: posts
      });
    }
  ));

  it('#getUserPosts should return an array of user own posts (response with reblogs)', inject(
    [SteemRPCService],
    (service: SteemRPCService) => {
      const posts = [
        {
          comment: {
            author: 'jakipatryk',
            body: '123'
          },
          blog: 'jakipatryk',
          reblog_on: '1970-01-01T00:00:00',
          entry_id: 103
        },
        {
          comment: {
            author: 'jakipatryk',
            body: '123'
          },
          blog: 'jakipatryk',
          reblog_on: '1970-01-01T00:00:00',
          entry_id: 101
        },
        {
          comment: {
            author: 'jakipatryk',
            body: '123'
          },
          blog: 'jakipatryk',
          reblog_on: '1970-01-01T00:00:00',
          entry_id: 98
        }
      ];

      service
        .getUserPosts('jakipatryk', 3)
        .subscribe(res => expect(res.posts).toEqual(posts));

      const firstReq = httpTestingController.expectOne(
        'https://api.steemit.com'
      );
      firstReq.flush({
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            comment: {
              author: 'jakipatryk',
              body: '123'
            },
            blog: 'jakipatryk',
            reblog_on: '1970-01-01T00:00:00',
            entry_id: 103
          },
          {
            comment: {
              author: 'jacekw',
              body: '123'
            },
            blog: 'jakipatryk',
            reblog_on: '2018-07-16T13:09:39',
            entry_id: 102
          },
          {
            comment: {
              author: 'jakipatryk',
              body: '123'
            },
            blog: 'jakipatryk',
            reblog_on: '1970-01-01T00:00:00',
            entry_id: 101
          }
        ]
      });
      const secondReq = httpTestingController.expectOne(
        'https://api.steemit.com'
      );
      secondReq.flush({
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            comment: {
              author: 'fervi',
              body: '123'
            },
            blog: 'jakipatryk',
            reblog_on: '2018-07-16T13:09:39',
            entry_id: 100
          }
        ]
      });
      const thirdReq = httpTestingController.expectOne(
        'https://api.steemit.com'
      );
      thirdReq.flush({
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            comment: {
              author: 'saunter',
              body: '123'
            },
            blog: 'jakipatryk',
            reblog_on: '1970-01-01T00:00:00',
            entry_id: 99
          }
        ]
      });
      const fourthReq = httpTestingController.expectOne(
        'https://api.steemit.com'
      );
      fourthReq.flush({
        jsonrpc: '2.0',
        id: 1,
        result: [
          {
            comment: {
              author: 'jakipatryk',
              body: '123'
            },
            blog: 'jakipatryk',
            reblog_on: '1970-01-01T00:00:00',
            entry_id: 98
          }
        ]
      });
    }
  ));
});
