import { createAction, props } from '@ngrx/store';
import { Abilities, CharacterAll } from 'src/app/models/character-sheet.model';

export const loadCharacterAll = createAction('[CharacterSheet] Load CharacterAll', props<{characterId: number}>());
export const loadCharacterAllSuccess = createAction('[CharacterSheet] Load CharacterAll Success', props<CharacterAll>());
export const loadCharacterAllError = createAction('[CharacterSheet] Load CharacterAll Error');
export const saveCharacterAbilities = createAction('[CharacterSheet] Save CharacterAbilities', props<Abilities>());
export const saveCharacterAbilitiesModifiers = createAction('[CharacterSheet] Save CharacterAbilitiesModifiers', props<Abilities>());