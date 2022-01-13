import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/common/auth.guard';

const routes: Routes = [
  {
    path: 'Login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'Profile',
    loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => m.ProfilePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'Register',
    loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule),
  },
  {
    path: 'Races',
    loadChildren: () => import('./pages/race-page/race-page.module').then(m => m.RacePageModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
