import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertsModule } from 'angular-alert-module';
import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';

@NgModule({
  imports: [
    CommonModule,
    AlertsModule.forRoot(),
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [AuthComponent, LayoutComponent, AuthFooterComponent, VerifyAccountComponent, ForgotPasswordComponent]
})
export class AuthModule { }
