import { Injectable } from '@angular/core';
import idb, { DB } from 'idb';
import { from, Observable } from 'rxjs';

// To add a new store you should (in this file):
//   1. Add this Store name to `Stores` type.
//   2. Increment version.
//   3. Add condition which checks if this Store already exists and if not create one.

// (1) Add the Store name for each Store you want to use.
/** Stores available in the application's IndexedDB. */
export type Stores = 'drafts' | 'templates';

/** Simple service used to deal with IndexedDB. */
@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  // (2) Increment the version each time you want to add a new Store.
  private readonly dbVersion = 2;
  private readonly dbName = 'steeditor-db';

  public getOne<T>(store: Stores, key: IDBValidKey): Observable<T> {
    return from(
      this.openDB().then(db =>
        db
          .transaction(store, 'readonly')
          .objectStore(store)
          .get(key)
      )
    );
  }

  public getAll<T>(store: Stores): Observable<T[]> {
    return from(
      this.openDB().then(db =>
        db
          .transaction(store, 'readonly')
          .objectStore(store)
          .getAll()
      )
    );
  }

  public add(store: Stores, value: any): Observable<IDBValidKey> {
    return from(
      this.openDB().then(db =>
        db
          .transaction(store, 'readwrite')
          .objectStore(store)
          .add(value)
      )
    );
  }

  public put(store: Stores, value: any): Observable<IDBValidKey> {
    return from(
      this.openDB().then(db =>
        db
          .transaction(store, 'readwrite')
          .objectStore(store)
          .put(value)
      )
    );
  }

  public delete(store: Stores, key: IDBValidKey): Observable<void> {
    return from(
      this.openDB().then(db =>
        db
          .transaction(store, 'readwrite')
          .objectStore(store)
          .delete(key)
      )
    );
  }

  private openDB(): Promise<DB> {
    return idb.open(this.dbName, this.dbVersion, upgradeDb => {
      // (3) Add condition for each Store to make sure this Store exists.
      if (!upgradeDb.objectStoreNames.contains('drafts')) {
        upgradeDb.createObjectStore('drafts', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
      if (!upgradeDb.objectStoreNames.contains('templates')) {
        upgradeDb.createObjectStore('templates', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    });
  }
}
