import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const authRoutes: Routes = [
    
    //Site routes goes here 
    { 
        path: '', 
        component: LayoutComponent,
        children: [
          { path: '', component: AuthComponent, pathMatch: 'full'},
          { path: 'verify/:link', component: VerifyAccountComponent, pathMatch: 'full'},
          { path: 'forgot-password/:link', component: ForgotPasswordComponent, pathMatch: 'full'}
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

