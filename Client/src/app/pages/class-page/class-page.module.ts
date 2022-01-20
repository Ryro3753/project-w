import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClassPageComponent } from './class-page.component';

@NgModule({
  declarations: [
    ClassPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ClassPageComponent

    }]),
    CommonModule
  ],
  providers: [
  ],
})
export class ClassPageModule { }
