import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharactersPageComponent } from './characters-page.component';

@NgModule({
  declarations: [
    CharactersPageComponent
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
