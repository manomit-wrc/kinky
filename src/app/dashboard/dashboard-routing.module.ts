import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { LayoutComponent } from './layout/layout.component';

const authRoutes: Routes = [
    
    //Site routes goes here 
    { 
        path: '', 
        component: LayoutComponent,
        children: [
          { path: 'settings', component: SettingsComponent, pathMatch: 'full'}
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
