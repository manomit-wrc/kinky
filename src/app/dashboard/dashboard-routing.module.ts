import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { MyLatestProfileComponent } from './my-latest-profile/my-latest-profile.component';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './events/add-events.component';
import { LayoutComponent } from './layout/layout.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AuthGuard } from '../guards';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
const authRoutes: Routes = [

    //Site routes goes here
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: 'settings', component: SettingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          { path: 'latest-personal-details', component: MyLatestProfileComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          { path: 'events', component: EventsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          { path: 'add-event', component: AddEventComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          { path: 'add-meetup', component: AddEventComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          { path: 'my-profile', component: MyProfileComponent, pathMatch: 'full', canActivate: [AuthGuard]},
          { path: 'my-photo-upload', component: PhotoUploadComponent, pathMatch: 'full', canActivate: [AuthGuard]},
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
