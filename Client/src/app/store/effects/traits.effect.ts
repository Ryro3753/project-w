import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { TraitsService } from 'src/app/services/traits.service';
import { loadTraits, loadTraitsError, loadTraitsSuccess} from '../actions/traits.action.ts';
import { catchError, map, of, switchMap } from 'rxjs';
import { TraitWithFeature } from 'src/app/models/traits.model';

@Injectable({
    providedIn: "root"
  })
export class TraitEffects {
    loadTraits$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(loadTraits),
            switchMap((action) => this.traitService.getTraitsWithDetails(action.userId).pipe(
                map((traits:TraitWithFeature[]) => loadTraitsSuccess({traits})),
                catchError(() => of(loadTraitsError))
            ))
        )
    })
  constructor(
    private actions$: Actions,
    private traitService: TraitsService
  ) {}
}