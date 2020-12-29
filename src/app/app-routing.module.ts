import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  { path: 'layout', loadChildren: () => import('../app/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
