import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesListComponent } from '../components/features-list/features-list.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

@NgModule({
  declarations: [
    FeaturesListComponent,
    PaginationComponent,
  ],
  imports: [
      CommonModule
  ],
  exports: [
    FeaturesListComponent,
    PaginationComponent,
  ]
})
export class SharedModule { }