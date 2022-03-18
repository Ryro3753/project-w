import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { loadCharacterAll, loadCharacterAllError, loadCharacterAllSuccess, loadSpellAll, loadSpellAllError, loadSpellAllSuccess } from '../actions/character-sheet.action';
import { CharacterSheetService } from 'src/app/services/character-sheet.service';
import { CharacterAll } from 'src/app/models/character-sheet.model';
import { SpellService } from 'src/app/services/spell.service';
import { SpellDetail } from 'src/app/models/spell.model';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CharacterSheetEffects {
  loadCharacterAll$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loadCharacterAll),
      switchMap((action) => this.characterSheetService.getAll(action.characterId).pipe(
        map((characterAll: CharacterAll) => loadCharacterAllSuccess(characterAll)),
        catchError(() => of(loadCharacterAllError))
      ))
    )
  })
  loadSpellsAll$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loadSpellAll),
      switchMap((action) => this.spellService.getAllSpells(action.userId).pipe(
        map((sp: SpellDetail[]) => loadSpellAllSuccess({spells: sp })),
        catchError(() => of(loadSpellAllError))
      ))
    )
  })
  constructor(
    private actions$: Actions,
    private characterSheetService: CharacterSheetService,
    private spellService: SpellService
  ) { }
}