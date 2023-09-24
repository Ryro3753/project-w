import { ActionReducerMap } from "@ngrx/store";
import { commonStoreReducer, CommonStoreState } from "./common-reducer";

export interface CombinedStates {
    commonStoreState: CommonStoreState | undefined;
}

export const combinedReducers: ActionReducerMap<CombinedStates> = {
    commonStoreState: commonStoreReducer
};