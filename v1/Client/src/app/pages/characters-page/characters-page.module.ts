import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharactersPageComponent } from './characters-page.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';

@NgModule({
  declarations: [
    CharactersPageComponent,
    CharacterCardComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: CharactersPageComponent
    }]),
    CommonModule
  ],
  providers: [
  ],
})
export class CharactersPageModule { }
