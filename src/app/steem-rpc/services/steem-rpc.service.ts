import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter as Rfilter, head, last } from 'ramda';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { expand, map, mergeMap, reduce } from 'rxjs/operators';
import { UserDataResponse, UserPostsResponse } from '../responses';
import { SteemRPCConfig, STEEM_RPC_CONFIG } from './../config';

@Injectable({
  providedIn: 'root'
})
export class SteemRPCService {
  constructor(
    @Inject(STEEM_RPC_CONFIG) private config: SteemRPCConfig,
    private http: HttpClient
  ) {}

  /**
   * Makes a call to RPC node configurated in SteemRPCConfig.
   * @param api An API to call (ex. 'condenser_api').
   * @param method Method of the API to call (ex. 'get_blog').
   * @param params Array of params for the specified method.
   */
  public call<T>(
    api: string,
    method: string,
    params: Array<any>
  ): Observable<T> {
    return this.http
      .post(this.config.node, {
        jsonrpc: '2.0',
        id: 1,
        method: `${api}.${method}`,
        params
      })
      .pipe(
        mergeMap(
          (response: { id: number; jsonrpc: '2.0'; result?: T; error?: any }) =>
            response.error ? throwError(response.error) : of(response.result)
        )
      );
  }

  /**
   * Gets information about given user.
   * @param user A username of user to get data of.
   */
  public getUserData(user: string): Observable<UserDataResponse> {
    return this.call<UserDataResponse>('condenser_api', 'get_accounts', [
      [user]
    ]).pipe(map(head));
  }

  /**
   * Gets a list of posts authored by a given user.
   * @param user A username of user to get posts of.
   * @param limit Maximum amount of posts to get.
   * @param startId Id of the first post to get.
   */
  public getUserPosts(
    user: string,
    limit: number,
    startId: number = 0
  ): Observable<UserPostsResponse> {
    const getPosts = (startOnId, lim, currentLength = 0) =>
      this.call('condenser_api', 'get_blog', [user, startOnId, lim]).pipe(
        map(response => ({
          posts: Rfilter(item => item.comment.author === user, response),
          lastCheckedId: last(response).entry_id
        })),
        map(items => ({
          ...items,
          currentLength: currentLength + items.posts.length
        }))
      );

    return getPosts(startId, limit).pipe(
      expand(
        res =>
          res.currentLength === limit || res.lastCheckedId === 0
            ? EMPTY
            : getPosts(
                res.lastCheckedId - 1,
                limit - res.currentLength,
                res.currentLength
              )
      ),
      reduce(
        (acc, val: UserPostsResponse) => ({
          posts: [...acc.posts, ...val.posts],
          lastCheckedId: val.lastCheckedId
        }),
        { posts: [] }
      )
    );
  }
}
