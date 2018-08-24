import { replace } from 'ramda';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserData } from '../../../store/auth-store';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  @Input()
  userData: UserData;

  get githubLink(): string {
    return `https://github.com/${this.userData.github}`;
  }

  get websiteDisplay(): string {
    return replace(
      /https?:\/\/(?:www\.|(?!www))|www\./,
      '',
      this.userData.website
    );
  }
}
