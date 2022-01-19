import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemPageComponent } from './item-page.component';

@NgModule({
  declarations: [
    ItemPageComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ItemPageComponent

    }]),
  ],
  providers: [
  ],
})
export class ItemPageModule { }
