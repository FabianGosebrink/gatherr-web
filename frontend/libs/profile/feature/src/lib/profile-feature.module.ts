import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from '@workspace/auth/util';
import {
  featureName,
  profileEffects,
  profileReducers,
} from '@workspace/profile/data';
import { CanEditGuard, RedirectToEditGuard } from '@workspace/profile/util';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

export const profileFeatureRoutes: Route[] = [
  {
    path: ':id/edit',
    component: ProfileDetailsComponent,
    canActivate: [AuthGuard, CanEditGuard],
  },
  {
    path: ':id',
    component: ProfileViewComponent,
    canActivate: [AuthGuard, RedirectToEditGuard],
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiCommonModule,
    SharedUiLayoutModule,
    RouterModule.forChild(profileFeatureRoutes),
    StoreModule.forFeature(featureName, profileReducers),
    EffectsModule.forFeature(profileEffects),
  ],
  declarations: [ProfileDetailsComponent, ProfileViewComponent],
})
export class ProfileFeatureModule {}
