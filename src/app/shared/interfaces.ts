import { Action } from '@ngrx/store';
// I use SuperAction instead of NGRX's `Action` interface cause it doesn't include `payload` property
// and generic type for `type` property;
// thus I couldn't create a union type without classes

export interface SuperAction<T extends string> extends Action {
  type: T;
}

export interface SuperActionWithPayload<T extends string, K>
  extends SuperAction<T> {
  payload: K;
}
