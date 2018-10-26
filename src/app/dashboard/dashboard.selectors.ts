import { createSelector} from '@ngrx/store';

export const selectDashboardState = state => state.dashboard;

export const loadAllMasters = createSelector(
    selectDashboardState,
    dashboard => dashboard !== undefined ? dashboard.masters : null
);
export const postAllMasters = createSelector(
    selectDashboardState,
    dashboard => dashboard.post !== undefined ? dashboard.post : null
);
