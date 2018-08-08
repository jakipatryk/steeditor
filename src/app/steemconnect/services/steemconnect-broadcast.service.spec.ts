import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { SteemconnectBroadcastService } from './steemconnect-broadcast.service';

fdescribe('#SteemconnectModule SteemconnectBroadcastService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SteemconnectBroadcastService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject(
    [SteemconnectBroadcastService],
    (service: SteemconnectBroadcastService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('#broadcastOperations should make a POST request to a correct URL', inject(
    [SteemconnectBroadcastService],
    (service: SteemconnectBroadcastService) => {
      service.broadcastOperations([['test_op', {}]]).subscribe();
      const req = httpTestingController.expectOne(
        service.steemconnectBroadcastURL
      );

      expect(req.request.method).toEqual('POST');
      expect(req.request.url).toEqual(service.steemconnectBroadcastURL);
      httpTestingController.verify();
    }
  ));

  it('#broadcastOperations should make a request with correct body', inject(
    [SteemconnectBroadcastService],
    (service: SteemconnectBroadcastService) => {
      service.broadcastOperations([['test_op', {}]]).subscribe();
      const req = httpTestingController.expectOne(
        service.steemconnectBroadcastURL
      );

      expect(req.request.body).toEqual({ operations: [['test_op', {}]] });
    }
  ));
});
