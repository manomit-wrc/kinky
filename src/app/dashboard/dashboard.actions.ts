import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  LOAD_MASTERS = '[Load Masters ] Action',
  POST_MASTERS = '[Post Masters] Action'
}


export class loadMasters implements Action {
  readonly type = DashboardActionTypes.LOAD_MASTERS;
  constructor ( public payload: { masters: any }) {}
}
export class postMasters implements Action {
  readonly type = DashboardActionTypes.POST_MASTERS;
  constructor ( public payload: { posts: any }) {}
}

export type DashboardActions = loadMasters | postMasters;
