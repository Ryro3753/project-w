import { createAction, props } from '@ngrx/store';
import { AuthenticateRequest, AuthenticateDetail } from 'src/app/models/user/user.interface';

export const authUser = createAction('[Auth] Auth User', props<{request: AuthenticateRequest}>());
export const authUserSuccess = createAction('[Auth] Auth User Success', props<{response: AuthenticateDetail}>());
export const authUserFailed = createAction('[Auth] Auth User Failed');