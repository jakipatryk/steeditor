import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { FileUploadService, FileValidatedState } from './file-upload.service';

fdescribe('#Services FileUploadService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileUploadService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject(
    [FileUploadService],
    (service: FileUploadService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('#uploadFile should send a POST request to `uploadURL`', inject(
    [FileUploadService],
    (service: FileUploadService) => {
      const validFakeFile = { size: service.maxUploadSize, type: 'image/png' };
      service.uploadFile(validFakeFile as File).subscribe();

      const req = httpTestingController.expectOne(service.uploadURL);

      expect(req.request.method).toEqual('POST');
      expect(req.request.url).toEqual(service.uploadURL);
      httpTestingController.verify();
    }
  ));

  it('#uploadFile should return object with `name` and `url` properties if file is valid', inject(
    [FileUploadService],
    (service: FileUploadService) => {
      const validFakeFile = { size: service.maxUploadSize, type: 'image/png' };
      service.uploadFile(validFakeFile as File).subscribe(result => {
        expect(result.name).toBeDefined();
        expect(result.url).toBeDefined();
      });

      httpTestingController
        .expectOne(service.uploadURL)
        .flush({ name: '', url: '' });
      httpTestingController.verify();
    }
  ));

  it('#uploadFile should throw if file is too big', inject(
    [FileUploadService],
    (service: FileUploadService) => {
      const validInvakeFile = {
        size: service.maxUploadSize + 1,
        type: 'image/png'
      };
      service
        .uploadFile(validInvakeFile as File)
        .subscribe(
          () => fail('should have thrown'),
          err => expect(err).toEqual(FileValidatedState.FILE_TOO_BIG)
        );
    }
  ));

  it('#uploadFile should throw if file is not an image', inject(
    [FileUploadService],
    (service: FileUploadService) => {
      const validInvakeFile = {
        size: service.maxUploadSize,
        type: 'audio/mpeg'
      };
      service
        .uploadFile(validInvakeFile as File)
        .subscribe(
          () => fail('should have thrown'),
          err => expect(err).toEqual(FileValidatedState.NOT_IMAGE)
        );
    }
  ));
});
