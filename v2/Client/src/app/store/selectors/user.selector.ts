import { createSelector } from "@ngrx/store";

export const contolState = (commonStoreState: any) => commonStoreState.commonStoreState;

export const selectAuthDetail = createSelector(contolState, state => state.authDetail);