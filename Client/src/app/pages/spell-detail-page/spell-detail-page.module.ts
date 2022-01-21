import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpellDetailPageComponent } from './spell-detail-page.component';

@NgModule({
  declarations: [
    SpellDetailPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: SpellDetailPageComponent
    }]),
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class SpellDetailPageModule { }
