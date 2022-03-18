import { createAction, props } from '@ngrx/store';
import { Abilities, CharacterAll } from 'src/app/models/character-sheet.model';
import { Spell, SpellDetail } from 'src/app/models/spell.model';

export const loadCharacterAll = createAction('[CharacterSheet] Load CharacterAll', props<{characterId: number}>());
export const loadCharacterAllSuccess = createAction('[CharacterSheet] Load CharacterAll Success', props<CharacterAll>());
export const loadCharacterAllError = createAction('[CharacterSheet] Load CharacterAll Error');
export const saveCharacterAbilities = createAction('[CharacterSheet] Save CharacterAbilities', props<Abilities>());
export const saveCharacterAbilitiesModifiers = createAction('[CharacterSheet] Save CharacterAbilitiesModifiers', props<Abilities>());
export const loadSpellAll = createAction('[CharacterSheet] Load Spells', props<{userId: string}>());
export const loadSpellAllSuccess = createAction('[CharacterSheet] Load Spells Success', props<{spells: SpellDetail[]}>());
export const loadSpellAllError = createAction('[CharacterSheet] Load Spells Error');
