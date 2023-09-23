import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from 'src/app/store/effects/user.effect';
import { combinedReducers, CombinedStates } from 'src/app/store/reducers';
import { nameof } from 'src/globals/functions';
import { UserPageComponent } from './user-page.component';

@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: UserPageComponent
    }]),
    StoreModule.forFeature(nameof<CombinedStates>('commonStoreState'), combinedReducers.commonStoreState),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
  ],
})
export class UserPageModule { }


