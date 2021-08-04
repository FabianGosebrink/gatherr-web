import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://pzpwrcg.auth0.com',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'ZxIBGbU2vtmLJEQ9YPKiKII4Qv1ZaarP',
        scope: 'openid profile offline_access',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        customParamsAuthRequest: {
          audience: 'https://localhost:5001',
        },
        customParamsRefreshTokenRequest: {
          scope: 'openid profile offline_access',
        },
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
