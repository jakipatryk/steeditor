import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserData } from '../../../store/auth-store';

@Component({
  selector: 'app-user-metadata',
  templateUrl: './user-metadata.component.html',
  styleUrls: ['./user-metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMetadataComponent {
  @Input()
  userData: UserData;

  get avatarCSS(): string {
    return this.userData.avatar
      ? `url(https://steemitimages.com/0x0/${this.userData.avatar})`
      : '';
  }

  get coverImageURL(): string {
    return this.userData.coverImage
      ? `https://steemitimages.com/0x0/${this.userData.coverImage}`
      : '';
  }
}
