import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthActionTypes, Login, Logout, Settings,   Location} from './auth.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {defer, of} from 'rxjs';


@Injectable()
export class AuthEffects {

  @Effect({dispatch:false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem("user", JSON.stringify(action.payload.info)))
  );

  @Effect({ dispatch: false })
  settings$ = this.actions$.pipe(
    ofType<Settings>(AuthActionTypes.USER_SETTINGS),
    tap(action => localStorage.setItem("settings", JSON.stringify(action.payload.settings)))
  )

  @Effect({dispatch:false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {

      localStorage.removeItem("user");
      localStorage.removeItem("settings");
      localStorage.removeItem("token");
      

    })
  );




  @Effect({ dispatch: false })
  $location = this.actions$.pipe(
    ofType<Location>(AuthActionTypes.USER_LOCATION),
    tap(action => localStorage.setItem("location", JSON.stringify(action.payload.location)))
  );

  @Effect()
  init$ = defer(() => {

    const userData = localStorage.getItem("user");
    const settingData = localStorage.getItem("settings");


    const locationData = localStorage.getItem("location");
   
    if (userData) {
       return of(
        new Login({info:JSON.parse(userData)}),
        new Settings({ settings: JSON.parse(settingData)}),


        new Location({ location: JSON.parse(locationData)})
       );
       
    }

    else {
      return of(new Logout());
    }

  });

  constructor(private actions$: Actions, private router:Router) {


  }


}
