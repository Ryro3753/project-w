import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { authUser, authUserFailed, authUserSuccess } from '../actions/user.action';
import { AuthenticateDetail } from 'src/app/models/user/user.interface';
import { UserService } from 'src/app/services/common/user.service';

@Injectable({
    providedIn: "root"
  })
export class UserEffects {
    authUser$ = createEffect((): any => {
        return this.actions$.pipe(
            ofType(authUser),
            switchMap((action) => this.userService.authenticate(action.request).pipe(
                map((authDetail:AuthenticateDetail) => authUserSuccess({response: authDetail})),
                catchError(() => of(authUserFailed))
            ))
        )
    })
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}