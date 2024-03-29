import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  featureName,
  personalEffects,
  personalReducers,
} from '@workspace/personal/data';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GatheringsPersonalComponent } from './gatherings-personal/gatherings-personal.component';
import { GroupsPersonalComponent } from './groups-personal/groups-personal.component';

export const personalFeatureRoutes: Route[] = [
  { path: '', redirectTo: 'profile' },
  { path: 'groups', component: GroupsPersonalComponent },
  { path: 'gatherings', component: GatheringsPersonalComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiCommonModule,
    SharedUiLayoutModule,
    RouterModule.forChild(personalFeatureRoutes),
    StoreModule.forFeature(featureName, personalReducers),
    EffectsModule.forFeature(personalEffects),
  ],

  declarations: [GroupsPersonalComponent, GatheringsPersonalComponent],
})
export class PersonalFeatureModule {}
