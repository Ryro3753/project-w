import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CharacterCreationPageComponent } from './character-creation-page.component';
import { CharacterBasicComponent } from './components/character-basic/character-basic.component';
import { CharacterApperanceComponent } from './components/character-apperance/character-apperance.component';
import { CharacterDetailsComponent } from './components/character-details/character-details.component';
import { CharacterAbilitiesComponent } from './components/character-abilities/character-abilities.component';

@NgModule({
  declarations: [
    CharacterCreationPageComponent,
    CharacterBasicComponent,
    CharacterApperanceComponent,
    CharacterDetailsComponent,
    CharacterAbilitiesComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: CharacterCreationPageComponent

    }]),
    CommonModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
  ],
})
export class CharacterCreationPageModule { }
