import { Injectable } from '@angular/core';
import idb, { DB } from 'idb';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private storeName;
  // Bump the version each time you want to create new Store.
  private dbVersion = 1;
  private readonly dbName = 'steeditor-db';

  constructor() {}

  /**
   * Sets Store name to be used in all other operations.
   */
  public useStore(name: string): void {
    this.storeName = name;
  }

  public getOne<T>(key: IDBValidKey): Observable<T> {
    return from(
      this.createStore().then(db =>
        db
          .transaction(this.storeName, 'readonly')
          .objectStore(this.storeName)
          .get(key)
      )
    );
  }

  public getAll<T>(): Observable<T[]> {
    return from(
      this.createStore().then(db =>
        db
          .transaction(this.storeName, 'readonly')
          .objectStore(this.storeName)
          .getAll()
      )
    );
  }

  public add(value: any): Observable<IDBValidKey> {
    return from(
      this.createStore().then(db =>
        db
          .transaction('drafts', 'readwrite')
          .objectStore('drafts')
          .add(value)
      )
    );
  }

  public put(value: any): Observable<IDBValidKey> {
    return from(
      this.createStore().then(db =>
        db
          .transaction('drafts', 'readwrite')
          .objectStore('drafts')
          .put(value)
      )
    );
  }

  public delete(key: IDBValidKey): Observable<void> {
    return from(
      this.createStore().then(db =>
        db
          .transaction('drafts', 'readwrite')
          .objectStore('drafts')
          .delete(key)
      )
    );
  }

  private createStore(): Promise<DB> {
    return idb.open(this.dbName, this.dbVersion, upgradeDb => {
      if (!upgradeDb.objectStoreNames.contains(this.storeName)) {
        upgradeDb.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    });
  }
}
