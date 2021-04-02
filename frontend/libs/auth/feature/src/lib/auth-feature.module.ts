import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFeatureRoutingModule } from './auth-feature-routing.module';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthFeatureRoutingModule, SharedUiLayoutModule]
})
export class AuthFeatureModule {}
