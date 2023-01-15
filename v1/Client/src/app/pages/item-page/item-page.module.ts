import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ItemPageComponent } from './item-page.component';
import { ItemSidebarComponent } from './components/item-sidebar/item-sidebar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ItemPageComponent,
    ItemSidebarComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ItemPageComponent

    }]),
    SharedModule,
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class ItemPageModule { }
