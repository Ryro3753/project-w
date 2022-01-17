import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TraitPageComponent } from './trait-page.component';
import { TraitCardComponent } from './components/trait-card/trait-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TraitPageComponent,
    TraitCardComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: TraitPageComponent

    }]),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [
  ],
})
export class TraitPageModule { }
