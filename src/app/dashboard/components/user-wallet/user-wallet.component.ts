import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserData } from '../../../store/auth-store';

@Component({
  selector: 'app-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserWalletComponent {
  @Input()
  userData: UserData;
}
