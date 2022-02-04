import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadCharacterAll, loadCharacterAllError, loadCharacterAllSuccess } from '../actions/character-sheet.action';
import { CharacterSheetService } from 'src/app/services/character-sheet.service';
import { CharacterAll } from 'src/app/models/character-sheet.model';

@Injectable({
    providedIn: "root"
  })
export class CharacterSheetEffects {
    loadCharacterAll$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(loadCharacterAll),
            switchMap((action) => this.characterSheetService.getAll(action.characterId).pipe(
                map((characterAll:CharacterAll) => loadCharacterAllSuccess(characterAll)),
                catchError(() => of(loadCharacterAllError))
            ))
        )
    })
  constructor(
    private actions$: Actions,
    private characterSheetService: CharacterSheetService
  ) {}
}