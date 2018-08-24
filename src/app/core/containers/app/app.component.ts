import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentUser, selectLoggingOut } from '../../../store/auth-store';
import { State } from '../../../store/root-state';
import { authActionCreators } from './../../../store/auth-store/actions';
import { routerActionCreators } from '../../../store/router-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  currentUser$: Observable<string | null>;
  isLoggingOut$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isLoggingOut$ = this.store.select(selectLoggingOut);
  }

  login() {
    this.store.dispatch(authActionCreators.login());
  }

  logout() {
    this.store.dispatch(authActionCreators.logout());
  }

  navigate(to: string) {
    this.store.dispatch(routerActionCreators.go({ path: [`/${to}`] }));
  }
}
