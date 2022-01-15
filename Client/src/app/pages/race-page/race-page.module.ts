import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RacePageComponent } from './race-page.component';
import { RaceAccordionComponent } from './components/race-accordion/race-accordion.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

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
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers: [
  ],
})
export class RacePageModule { }
