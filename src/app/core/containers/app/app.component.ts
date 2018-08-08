import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  isLoggingOut$: Observable<boolean>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(fromStore.authenticate());
    this.isAuthenticated$ = this.store.select(fromStore.selectAuthenticated);
    this.isLoggingOut$ = this.store.select(fromStore.selectLoggingOut);
  }

  login() {
    this.store.dispatch(fromStore.login());
  }

  logout() {
    this.store.dispatch(fromStore.logout());
  }
}
