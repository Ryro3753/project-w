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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
