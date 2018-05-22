import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(fromStore.authenticate());
    this.isAuthenticated$ = this.store.select(fromStore.selectAuthenticated);
  }

  login() {
    this.store.dispatch(fromStore.login());
  }

  logout() {
    this.store.dispatch(fromStore.logout());
  }
}
