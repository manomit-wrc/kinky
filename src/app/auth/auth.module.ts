import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';
import { AlertsModule } from 'angular-alert-module';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';

@NgModule({
  imports: [
    CommonModule,
    AlertsModule.forRoot(),
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [AuthComponent, LayoutComponent, AuthFooterComponent]
})
export class AuthModule { }
