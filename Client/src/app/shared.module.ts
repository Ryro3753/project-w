import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesListComponent } from './components/features-list/features-list.component';

@NgModule({
  declarations: [
    FeaturesListComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
    FeaturesListComponent
  ]
})
export class SharedModule { }