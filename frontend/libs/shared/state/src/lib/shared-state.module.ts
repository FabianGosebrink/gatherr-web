import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  featureName,
  sharedProfileEffects,
  sharedProfileReducers,
} from './store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(featureName, sharedProfileReducers),
    EffectsModule.forFeature(sharedProfileEffects),
  ],
})
export class SharedStateModule {}
