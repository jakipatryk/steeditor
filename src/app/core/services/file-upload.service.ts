import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { always, complement, cond, lt, o, prop, T, test } from 'ramda';
import { Observable, throwError } from 'rxjs';

export interface FileUploadResponse {
  name: string;
  url: string;
}

export enum FileValidatedState {
  VALID = 'Valid',
  FILE_TOO_BIG = 'This file is too big!',
  NOT_IMAGE = 'File has to be an image!'
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public readonly uploadURL = 'https://ipfs.busy.org/upload';
  public readonly maxUploadSize = 15728640;

  constructor(private http: HttpClient) {}

  public uploadFile(file: File): Observable<FileUploadResponse> {
    const validatedState = this.validateFile(file);
    return validatedState === FileValidatedState.VALID
      ? this.http.post<FileUploadResponse>(
          this.uploadURL,
          this.fileToFormData(file)
        )
      : throwError(validatedState);
  }

  private fileToFormData(file: File): FormData {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return fd;
  }

  private validateFile(
    file: File
  ):
    | FileValidatedState.VALID
    | FileValidatedState.FILE_TOO_BIG
    | FileValidatedState.NOT_IMAGE {
    return cond([
      [
        o(lt(this.maxUploadSize), prop('size')),
        always(FileValidatedState.FILE_TOO_BIG)
      ],
      [
        o(complement(test(/^image/)), prop('type')),
        always(FileValidatedState.NOT_IMAGE)
      ],
      [T, always(FileValidatedState.VALID)]
    ])(file);
  }
}
