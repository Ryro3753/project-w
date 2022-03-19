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
import { FeaturePanelComponent } from './components/character-sheet-panel/components/feature-panel/feature-panel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApperancePanelComponent } from './components/character-sheet-panel/components/apperance-panel/apperance-panel.component';
import { DescriptionPanelComponent } from './components/character-sheet-panel/components/description-panel/description-panel.component';
import { SpellPanelComponent } from './components/character-sheet-panel/components/spell-panel/spell-panel.component';
import { InventoryPanelComponent } from './components/character-sheet-panel/components/inventory-panel/inventory-panel.component';

@NgModule({
  declarations: [
    CharacterSheetPageComponent,
    CharacterSheetAbilitiesComponent,
    CharacterSheetSkillsComponent,
    CharacterSheetMiscellaneousCardComponent,
    CharacterSheetCharacterBarComponent,
    CharacterSheetPanelComponent,
    FeaturePanelComponent,
    ApperancePanelComponent,
    DescriptionPanelComponent,
    SpellPanelComponent,
    InventoryPanelComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: CharacterSheetPageComponent
    }]),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  providers: [
  ],
})
export class CharacterSheetPageModule { }
