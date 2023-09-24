import { Action, createReducer, on } from '@ngrx/store';
import { AuthenticateDetail } from 'src/app/models/user';
import { authUserSuccess } from 'src/app/store/actions/user.actions';

export interface CommonStoreState {
    authDetail: AuthenticateDetail | undefined;
}

export const initialState: CommonStoreState = {
    authDetail: undefined
};

const _commonStoreReducer = createReducer(
    initialState,
    on(authUserSuccess, (state: CommonStoreState, payload: any) => {
      return { ...state, authDetail: payload.response };
    },)
  );

export function commonStoreReducer(state : CommonStoreState | undefined, action : Action): CommonStoreState {
    return _commonStoreReducer(state, action);
  }