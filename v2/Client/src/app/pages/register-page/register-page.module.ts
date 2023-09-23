import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from 'src/app/store/effects/user.effect';
import { combinedReducers, CombinedStates } from 'src/app/store/reducers';
import { nameof } from 'src/globals/functions';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: RegisterPageComponent
    }]),
    StoreModule.forFeature(nameof<CombinedStates>('commonStoreState'), combinedReducers.commonStoreState),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
  ],
})
export class RegisterPageModule { }


