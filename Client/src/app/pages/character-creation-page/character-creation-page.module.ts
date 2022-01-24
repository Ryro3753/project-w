import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
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
    CommonModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
  ],
})
export class CharacterCreationPageModule { }
