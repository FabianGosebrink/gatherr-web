import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedEnvironmentModuleConfig } from './shared-environment-config';

@NgModule({
  imports: [CommonModule],
})
export class SharedEnvironmentModule {
  static forRoot(
    config: SharedEnvironmentModuleConfig
  ): ModuleWithProviders<SharedEnvironmentModule> {
    return {
      ngModule: SharedEnvironmentModule,
      providers: [{ provide: SharedEnvironmentModuleConfig, useValue: config }],
    };
  }
}
