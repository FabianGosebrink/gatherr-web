import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfile } from '@workspace/shared/data';

@Component({
  selector: 'workspace-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  @Input() loggedIn = false;
  @Input() userProfile: UserProfile = null;

  @Input() availableLangs = ['de', 'en'];
  @Input() currentLang = 'de';
  @Input() userPicture = '';
  @Output() languageChanged = new EventEmitter();

  doLogin() {
    this.login.emit();
  }

  doLogout() {
    this.logout.emit();
  }
}
