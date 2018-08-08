import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-log-in-out',
  templateUrl: './log-in-out.component.html',
  styleUrls: ['./log-in-out.component.scss']
})
export class LogInOutComponent {
  @Input()
  isAuthenticated: boolean;
  @Input()
  isLoggingOut: boolean;
  @Output()
  login = new EventEmitter<void>();
  @Output()
  logout = new EventEmitter<void>();

  onLogin() {
    this.login.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
