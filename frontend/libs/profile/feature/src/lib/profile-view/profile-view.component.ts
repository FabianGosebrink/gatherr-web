import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  getProfile,
  selectIsLoading,
  selectUserProfile,
} from '@workspace/profile/data';
import { UserProfile } from '@workspace/shared/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'workspace-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  userProfile$: Observable<UserProfile>;
  isLoading$: Observable<boolean>;
  constructor(
    private store: Store<any>,
    public location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserProfile));

    this.isLoading$ = this.store.pipe(select(selectIsLoading));

    this.store.dispatch(
      getProfile({ payload: this.activatedRoute.snapshot.params.id })
    );
  }
}
