import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharacterCreationPageComponent } from './character-creation-page.component';
import { CharacterBasicComponent } from './components/character-basic/character-basic.component';

@NgModule({
  declarations: [
    CharacterCreationPageComponent,
    CharacterBasicComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: CharacterCreationPageComponent

    }]),
    CommonModule
  ],
  providers: [
  ],
})
export class CharacterCreationPageModule { }
