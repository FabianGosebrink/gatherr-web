import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { select, Store } from '@ngrx/store';
import {
  checkAuth,
  logout,
  selectCurrentUserName,
  selectCurrentUserPicture,
  selectIsLoggedIn,
} from '@workspace/auth/data';
import { UserProfile } from '@workspace/shared/data';
import { selectSharedCurrentUserProfile } from '@workspace/shared/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'gatherr';
  loggedIn$: Observable<boolean>;
  username$: Observable<string>;
  avatar$: Observable<string>;
  currentProfile$: Observable<UserProfile>;
  availableLangs: string[];
  currentLang: string;

  constructor(
    private store: Store<any>,
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(selectIsLoggedIn));
    this.username$ = this.store.pipe(select(selectCurrentUserName));
    this.avatar$ = this.store.pipe(select(selectCurrentUserPicture));
    this.currentProfile$ = this.store.pipe(
      select(selectSharedCurrentUserProfile)
    );

    this.availableLangs = this.translocoService.getAvailableLangs() as string[];
    this.currentLang = this.translocoService.getActiveLang();

    this.store.dispatch(checkAuth());
  }

  logout() {
    this.store.dispatch(logout());
  }

  login() {
    this.router.navigate(['auth']);
  }

  languageChanged(language: string) {
    this.translocoService.setActiveLang(language);
    this.currentLang = this.translocoService.getActiveLang();
  }
}
