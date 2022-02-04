import { createAction, props } from '@ngrx/store';
import { TraitWithFeature } from 'src/app/models/traits.model';

export const loadTraits = createAction('[Traits] Load Traits');
export const loadTraitsSuccess = createAction('[Traits] Load Traits Success', props<{traits: TraitWithFeature[]}>());
export const loadTraitsError = createAction('[Traits] Load Traits Error');