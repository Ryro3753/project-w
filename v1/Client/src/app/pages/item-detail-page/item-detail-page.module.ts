import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemDetailPageComponent } from './item-detail-page.component';
import { ItemAttributeListComponent } from './compoenents/item-attribute-list/item-attribute-list.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ItemDetailPageComponent,
    ItemAttributeListComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ItemDetailPageComponent

    }]),
    FormsModule,
    CommonModule,
    SharedModule,
    NgSelectModule
  ],
  providers: [
  ],
})
export class ItemDetailPageModule { }
