import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import {
  DefaultRouterStateSerializer,
  RouterState,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedEnvironmentModule } from '@workspace/shared/environment';
import { SharedStateModule } from '@workspace/shared/state';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { allMainEffects, appReducers } from './store/app-state';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { AuthConfigModule } from './auth/auth-config.module';
export function windowFactory() {
  return window;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    SharedUiCommonModule,

    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      },
    }),

    EffectsModule.forRoot(allMainEffects),

    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
      routerState: RouterState.Minimal,
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    SharedEnvironmentModule.forRoot({
      apiUrl: environment.server + environment.api + environment.version,
      serverUrl: environment.server,
    }),

    SharedStateModule,

    TranslocoRootModule,
      AuthConfigModule,
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: 'Window', useFactory: windowFactory }],
})
export class AppModule {}
