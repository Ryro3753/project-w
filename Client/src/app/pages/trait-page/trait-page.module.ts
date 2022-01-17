import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TraitPageComponent } from './trait-page.component';

@NgModule({
  declarations: [
    TraitPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: TraitPageComponent

    }]),
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class TraitPageModule { }
