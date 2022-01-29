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
  ],
  providers: [
  ],
})
export class CharactersPageModule { }
