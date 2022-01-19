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
  {
    path: 'Traits',
    loadChildren: () => import('./pages/trait-page/trait-page.module').then(m => m.TraitPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'Items',
    loadChildren: () => import('./pages/item-page/item-page.module').then(m => m.ItemPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'Items/:itemId',
    loadChildren: () => import('./pages/item-detail-page/item-detail-page.module').then(m => m.ItemDetailPageModule),
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
