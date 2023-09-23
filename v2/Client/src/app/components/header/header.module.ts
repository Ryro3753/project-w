import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from 'src/app/store/effects/user.effect';
import { combinedReducers, CombinedStates } from 'src/app/store/reducers';
import { nameof } from 'src/globals/functions';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(nameof<CombinedStates>('commonStoreState'), combinedReducers.commonStoreState),
    EffectsModule.forFeature([UserEffects]),
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }


