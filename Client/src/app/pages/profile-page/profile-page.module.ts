import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ProfilePageComponent
    }]),
  ],
  providers: [
  ],
})
export class ProfilePageModule { }
