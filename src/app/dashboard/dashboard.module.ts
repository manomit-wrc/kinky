import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { SwitchaccountComponent } from './switchaccount/switchaccount.component';
import { DeleteaccountComponent } from './deleteaccount/deleteaccount.component';
import { SiteconfigureComponent } from './siteconfigure/siteconfigure.component';
import { InterestsComponent } from './interests/interests.component';
import { ProfileProtectionComponent } from './profile-protection/profile-protection.component';

import { AlertsModule } from 'angular-alert-module';
import { AlertsComponent } from './alerts/alerts.component';

import { IntroductionMessageComponent } from './introduction-message/introduction-message.component';
import { MyLatestProfileComponent } from './my-latest-profile/my-latest-profile.component';

@NgModule({
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertsModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
     ChangePasswordComponent,
      SwitchaccountComponent,
       DeleteaccountComponent,
       SiteconfigureComponent,
       InterestsComponent,
       ProfileProtectionComponent,
       IntroductionMessageComponent,
       AlertsComponent,
       MyLatestProfileComponent
      ]
})
export class DashboardModule { }
