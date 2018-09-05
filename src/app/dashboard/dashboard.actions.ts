import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  LoadMasterAction = '[LoadMasters] Action'
}

export class LoadMaster implements Action {
  readonly type = DashboardActionTypes.LoadMasterAction;
  constructor(public payload: {masters: any}) {

  }
}

export type DashboardActions = LoadMaster;
