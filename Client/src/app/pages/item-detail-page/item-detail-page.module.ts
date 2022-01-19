import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemDetailPageComponent } from './item-detail-page.component';

@NgModule({
  declarations: [
    ItemDetailPageComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ItemDetailPageComponent

    }]),
  ],
  providers: [
  ],
})
export class ItemDetailPageModule { }
