import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Operation extends Array<string | { [K: string]: any }> {
  0: string;
  1: { [K: string]: any };
}

export interface BroadcastResult {
  id: string;
  block_num: number;
  trx_num: number;
  expired: boolean;
  ref_block_num: number;
  ref_block_prefix: number;
  expiration: Date;
  operations: Array<Operation>;
  extensions: Array<any>;
  signatures: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class SteemconnectBroadcastService {
  public readonly steemconnectBroadcastURL =
    'https://steemconnect.com/api/broadcast';

  constructor(private http: HttpClient) {}

  /**
   * Broadcasts given operations to the Steem blockchain via SteemConnect.
   * @param operations Array of operations to broadcast.
   */
  public broadcastOperations(
    operations: Array<Operation>
  ): Observable<BroadcastResult> {
    return this.http
      .post<{ result: BroadcastResult }>(this.steemconnectBroadcastURL, {
        operations
      })
      .pipe(map((response: { result: BroadcastResult }) => response.result));
  }
}
