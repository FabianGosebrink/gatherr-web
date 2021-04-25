import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@workspace/auth/util';
import {
  CallbackComponent,
  NotFoundComponent,
} from '@workspace/shared/ui-common';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('@workspace/auth/feature').then((m) => m.AuthFeatureModule),
  },
  {
    path: 'start',
    loadChildren: () =>
      import('@workspace/home/feature').then((m) => m.HomeFeatureModule),
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('@workspace/groups/feature').then((m) => m.GroupsFeatureModule),
  },
  {
    path: 'personal',
    loadChildren: () =>
      import('@workspace/personal/feature').then(
        (m) => m.PersonalFeatureModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@workspace/profile/feature').then((m) => m.ProfileFeatureModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
