import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectComponent implements OnInit, OnDestroy {
  isAuthenticatedSubscription: Subscription;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(fromStore.loginCallback());
    this.isAuthenticatedSubscription = this.store
      .select(fromStore.selectAuthenticated)
      .pipe(
        tap(isAuthenticated => {
          if (isAuthenticated) {
            this.store.dispatch(new fromStore.Go({ path: ['/drafts'] }));
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.isAuthenticatedSubscription.unsubscribe();
  }
}
