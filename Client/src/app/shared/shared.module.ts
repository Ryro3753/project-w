import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharacterFeatureListComponent } from '../components/character-feature-list/character-feature-list.component';
import { CustomListComponent } from '../components/custom-list/custom-list.component';
import { FeaturesListComponent } from '../components/features-list/features-list.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

@NgModule({
  declarations: [
    FeaturesListComponent,
    PaginationComponent,
    CustomListComponent,
    CharacterFeatureListComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
    FeaturesListComponent,
    PaginationComponent,
    CustomListComponent,
    CharacterFeatureListComponent
  ]
})
export class SharedModule { }