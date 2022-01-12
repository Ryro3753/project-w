import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: RegisterPageComponent
    }]),
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class RegisterPageModule { }
