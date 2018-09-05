import {createSelector} from '@ngrx/store';

export const selectMasterState = state => state.dashboard

export const loadMaster = createSelector(
    selectMasterState
)