import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomListComponent } from '../components/custom-list/custom-list.component';
import { FeaturesListComponent } from '../components/features-list/features-list.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

@NgModule({
  declarations: [
    FeaturesListComponent,
    PaginationComponent,
    CustomListComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
    FeaturesListComponent,
    PaginationComponent,
    CustomListComponent
  ]
})
export class SharedModule { }