import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { featureName, homeEffects, homeReducers } from '@workspace/home/data';
import { HomeUiModule } from '@workspace/home/ui';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HomeFeatureRoutingModule } from './home-feature-routing.module';
import { Home2Component } from './home2/home2.component';

@NgModule({
  declarations: [Home2Component],
  imports: [
    CommonModule,
    HomeFeatureRoutingModule,
    HomeUiModule,
    SharedUiCommonModule,
    SharedUiLayoutModule,
    StoreModule.forFeature(featureName, homeReducers),
    EffectsModule.forFeature(homeEffects),
    TranslocoModule,
    IvyCarouselModule,
  ],
})
export class HomeFeatureModule {}
