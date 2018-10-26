import { ModuleWithProviders,NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
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



import { AlertsComponent } from './alerts/alerts.component';

import { IntroductionMessageComponent } from './introduction-message/introduction-message.component';
import { MyLatestProfileComponent } from './my-latest-profile/my-latest-profile.component';
import { EventsComponent } from './events/events.component';
import { AddEventComponent } from './events/add-events.component';

import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './dashboard.effects';

import { MyProfileComponent } from './my-profile/my-profile.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import * as fromCountry from './country/country.reducer';
import { CountryEffects } from './country/country.effects';
import { NgProgressModule } from '@ngx-progressbar/core';
import { OnlineUsersComponent } from './online-users/online-users.component';
import { OwlModule } from 'ngx-owl-carousel';
import { NgxImageGalleryModule } from 'ngx-image-gallery';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { FriendlistComponent } from './friendlist/friendlist.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { CarouselComponent, CarouselItemElement } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel-item.directive';
import { SearchComponent } from './search/search.component';
import { ToastrModule } from 'ngx-toastr';
import { UserTimelineComponent } from './user-timeline/user-timeline.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {ModalModule} from "ngx-modal";
@NgModule({
  imports: [
    CommonModule,
    NgProgressModule.forRoot(),
    ToastrModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    NgSelectModule,
    OwlModule,
    NgxImageGalleryModule,
    DashBoardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('dashboard', fromDashboard.dashBoardReducer),
    EffectsModule.forFeature([DashboardEffects, CountryEffects]),
    StoreModule.forFeature('country', fromCountry.countriesReducer),
    FilterPipeModule,
    ModalModule

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
       MyLatestProfileComponent,
       EventsComponent,
       AddEventComponent,
       MyProfileComponent,
       PhotoUploadComponent,
       OnlineUsersComponent,
       FriendlistComponent,
       VideoUploadComponent,
       CarouselComponent,
       CarouselItemElement,
       CarouselItemDirective,
       SearchComponent,
       UserTimelineComponent
      ]
})

export class DashboardModule {
  static forRoot(): ModuleWithProviders {
      return {
          ngModule: DashboardModule,

      }
  }
}
