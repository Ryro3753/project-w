import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from 'src/app/store/effects/user.effect';
import { combinedReducers, CombinedStates } from 'src/app/store/reducers';
import { nameof } from 'src/globals/functions';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: LoginPageComponent
    }]),
    StoreModule.forFeature(nameof<CombinedStates>('commonStoreState'), combinedReducers.commonStoreState),
    EffectsModule.forFeature([UserEffects]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
})
export class LoginPageModule { }


