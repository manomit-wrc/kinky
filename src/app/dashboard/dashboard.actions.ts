import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  LOAD_MASTERS = '[Load Masters ] Action'
}


export class loadMasters implements Action {
  readonly type = DashboardActionTypes.LOAD_MASTERS;
  constructor ( public payload: { masters: any }) {}
}

export type DashboardActions = loadMasters;
