import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharacterSheetPageComponent } from './character-sheet-page.component';
import { CharacterSheetAbilitiesComponent } from './components/character-sheet-abilities/character-sheet-abilities.component';
import { CharacterSheetSkillsComponent } from './components/character-sheet-skills/character-sheet-skills.component';
import { CharacterSheetMiscellaneousCardComponent } from './components/character-sheet-miscellaneous-card/character-sheet-miscellaneous-card.component';
import { CharacterSheetCharacterBarComponent } from './components/character-sheet-character-bar/character-sheet-character-bar.component';
import { FormsModule } from '@angular/forms';
import { CharacterSheetPanelComponent } from './components/character-sheet-panel/character-sheet-panel.component';

@NgModule({
  declarations: [
    CharacterSheetPageComponent,
    CharacterSheetAbilitiesComponent,
    CharacterSheetSkillsComponent,
    CharacterSheetMiscellaneousCardComponent,
    CharacterSheetCharacterBarComponent,
    CharacterSheetPanelComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: CharacterSheetPageComponent
    }]),
    CommonModule,
    FormsModule
  ],
  providers: [
  ],
})
export class CharacterSheetPageModule { }
