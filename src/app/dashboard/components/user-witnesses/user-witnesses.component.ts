import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserData } from '../../../store/auth-store';

@Component({
  selector: 'app-user-witnesses',
  templateUrl: './user-witnesses.component.html',
  styleUrls: ['./user-witnesses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserWitnessesComponent {
  @Input()
  userData: UserData;

  showAllMode = false;

  showAll(): void {
    this.showAllMode = true;
  }
}
