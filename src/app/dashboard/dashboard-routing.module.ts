import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { MyLatestProfileComponent } from './my-latest-profile/my-latest-profile.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guards';

const authRoutes: Routes = [

    //Site routes goes here
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'settings', component: SettingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          { path: 'latest-personal-details', component: MyLatestProfileComponent, pathMatch: 'full', canActivate: [AuthGuard]}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})

export class DashBoardRoutingModule {}
