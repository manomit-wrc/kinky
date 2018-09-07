import {createFeatureSelector, createSelector} from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';
import * as fromDashboard from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>("dashboard");

