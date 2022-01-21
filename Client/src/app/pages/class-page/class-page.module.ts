import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassPageComponent } from './class-page.component';
import { ClassAccordionComponent } from './components/class-accordion/class-accordion.component';

@NgModule({
  declarations: [
    ClassPageComponent,
    ClassAccordionComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ClassPageComponent

    }]),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [
  ],
})
export class ClassPageModule { }
