import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpellPageComponent } from './spell-page.component';

@NgModule({
  declarations: [
    SpellPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: SpellPageComponent
    }]),
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class SpellPageModule { }
