import { Action, createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/login.action';
import { User } from '../../models/common/user.model';
import { TraitWithFeature } from 'src/app/models/traits.model';
import { loadTraitsSuccess } from '../actions/traits.action';
import { loadCharacterAllSuccess, loadSpellAllSuccess, saveCharacterAbilities, saveCharacterAbilitiesModifiers } from '../actions/character-sheet.action';
import { Abilities, CharacterAll } from 'src/app/models/character-sheet.model';
import { SpellDetail } from 'src/app/models/spell.model';

export interface State {
    user: User | undefined;
    traits: TraitWithFeature[] | undefined;
    characterAll: CharacterAll | undefined;
    characterAbilities: Abilities | undefined;
    characterAbilitiesModifiers: Abilities | undefined;
    spells: SpellDetail[] | undefined;
}

export const initialState: State = {
    user: undefined,
    traits: undefined,
    characterAll: undefined,
    characterAbilities: undefined,
    characterAbilitiesModifiers: undefined,
    spells: undefined
};

const _storeReducer = createReducer(
    initialState,
    on(login, (state: State, payload: User | undefined) => {
        return ({ ...state, user: payload });
    }),
    on(logout, (state:State) => {
        return ({...state, user: undefined})
    } ),
    on(loadTraitsSuccess, (state: State, payload:any) => {
        return ({...state, traits: payload.traits});
    }),
    on(loadCharacterAllSuccess, (state: State, payload:any) => {
        return ({...state, characterAll: payload})
    }),
    on(saveCharacterAbilities, (state: State, payload:any) => {
        return ({...state, characterAbilities: payload});
    }),
    on(saveCharacterAbilitiesModifiers, (state: State, payload:any) => {
        return ({...state, characterAbilitiesModifiers: payload});
    }),
    on(loadSpellAllSuccess, (state:State, payload: any) => {
        return ({...state, spells: payload.spells});
    })
  );


export function storeReducer(state : State | undefined, action : Action) {
    return _storeReducer(state, action);
  }