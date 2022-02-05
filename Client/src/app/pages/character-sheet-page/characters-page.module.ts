import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharacterSheetPageComponent } from './character-sheet-page.component';
import { CharacterSheetAbilitiesComponent } from './components/character-sheet-abilities/character-sheet-abilities.component';

@NgModule({
  declarations: [
    CharacterSheetPageComponent,
    CharacterSheetAbilitiesComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: CharacterSheetPageComponent
    }]),
    CommonModule
  ],
  providers: [
  ],
})
export class CharacterSheetPageModule { }
