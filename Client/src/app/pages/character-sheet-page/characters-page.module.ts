import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharacterSheetPageComponent } from './character-sheet-page.component';

@NgModule({
  declarations: [
    CharacterSheetPageComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: CharacterSheetPageComponent
    }]),
  ],
  providers: [
  ],
})
export class CharacterSheetPageModule { }
