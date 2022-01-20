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
  ],
  providers: [
  ],
})
export class ClassPageModule { }
