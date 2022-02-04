import { createAction, props } from '@ngrx/store';
import { CharacterAll } from 'src/app/models/character-sheet.model';

export const loadCharacterAll = createAction('[CharacterSheet] Load CharacterAll', props<{characterId: number}>());
export const loadCharacterAllSuccess = createAction('[CharacterSheet] Load CharacterAll Success', props<CharacterAll>());
export const loadCharacterAllError = createAction('[CharacterSheet] Load CharacterAll Error');