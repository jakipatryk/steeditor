import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserStatusComponent {
  @Input()
  currentUser: string | null;
  @Input()
  isLoggingOut: boolean;
  @Output()
  login = new EventEmitter<void>();
  @Output()
  logout = new EventEmitter<void>();
  @Output()
  navigate = new EventEmitter<string>();

  get userAvatar(): string {
    return `https://steemitimages.com/u/${this.currentUser}/avatar/small`;
  }

  onLogin() {
    this.login.emit();
  }

  onLogout() {
    this.logout.emit();
  }

  goToDashboard() {
    this.navigate.emit('dashboard');
  }
}
