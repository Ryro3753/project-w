import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'User',
    loadChildren: () => import('./pages/user-page/user-page.module').then(m => m.UserPageModule)
  },
  {
    path: 'Login',
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'Register',
    loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'Board',
    loadChildren: () => import('./pages/board-page/board-page.module').then(m => m.BoardPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
