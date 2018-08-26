import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';

const authRoutes: Routes = [
    
    //Site routes goes here 
    { 
        path: '', 
        component: LayoutComponent,
        children: [
          { path: '', component: AuthComponent, pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})

export class AuthRoutingModule {}

