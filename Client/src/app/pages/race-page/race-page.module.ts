import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RacePageComponent } from './race-page.component';
import { RaceAccordionComponent } from './components/race-accordion/race-accordion.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    RacePageComponent,
    RaceAccordionComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: RacePageComponent
    }]),
    CommonModule
  ],
  providers: [
  ],
})
export class RacePageModule { }
