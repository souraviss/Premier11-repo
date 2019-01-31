import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';



import { MDBBootstrapModule, WavesModule, ButtonsModule, CardsFreeModule } from 'angular-bootstrap-md';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



/*angular material compoment*/
import { MatFormFieldModule , MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { MatTabsModule, MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';

import { MatDialogRef} from '@angular/material';



/*firebase*/
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {  AngularFireAuthModule} from 'angularfire2/auth';

/*component */
import { LoginComponent } from './login/login.component';
import { FleshScreenComponent } from './flesh-screen/flesh-screen.component';

// environment
import { environment } from '../environments/environment';


/* Service */
import { ServicesService } from './service/services.service';
import { ErrorComponent } from './error/error.component';
import { MatchcenterComponent } from './matchcenter/matchcenter.component';
import { HeaderComponent } from './header/header.component';

import { FootballComponent } from './football/football.component';
import { FooterComponent } from './footer/footer.component';

import { BannerComponent } from './banner/banner.component';
import { ContestsComponent } from './contests/contests.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AllcontestComponent } from './allcontest/allcontest.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AllContextComponent } from './all-context/all-context.component';
import { JoinedContextComponent } from './joined-context/joined-context.component';
import { ViewPlayerInfoComponent } from './view-player-info/view-player-info.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import {SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider} from 'ng4-social-login';
import { EmailvarificationComponent } from './emailvarification/emailvarification.component';
import { OnlyNumberDirective } from './Common/OnlyNumber';
import { ProfileComponent } from './profile/profile.component';
import { RecenttransactionComponent } from './recenttransaction/recenttransaction.component';
import { RewardcriteriaComponent } from './rewardcriteria/rewardcriteria.component';


const config=new AuthServiceConfig([{
  id:GoogleLoginProvider.PROVIDER_ID,
  provider:new GoogleLoginProvider('230111532606-g5tc1d3isje1ga5ih07h962fo3s3i33s.apps.googleusercontent.com')
},
{
id:FacebookLoginProvider.PROVIDER_ID,
provider:new FacebookLoginProvider('773078046390528')
}
],false);

export function provideConfig(){
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    LoginComponent,
    FleshScreenComponent,
    ErrorComponent,
    MatchcenterComponent,
    HeaderComponent,
    ProfileComponent,
    RecenttransactionComponent,
    RewardcriteriaComponent,

    FootballComponent,
    FooterComponent,

    BannerComponent,
    ContestsComponent,
    ProfileFormComponent,
    AllcontestComponent,
    ChangepasswordComponent,
    AllContextComponent,
    JoinedContextComponent,
    ViewPlayerInfoComponent,
    CreateTeamComponent,
    SignInComponent,
    SignUpComponent,
    EmailvarificationComponent,
    OnlyNumberDirective
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule ,
    HttpClientModule ,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,
    MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatBadgeModule ,
    FormsModule,
    SocialLoginModule
  ],
  entryComponents:[
    LoginComponent,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ServicesService ,  {provide: MatDialogRef, useValue: {} },    {provide:AuthServiceConfig,useFactory:provideConfig}],
  bootstrap: [AppComponent],

})
export class AppModule { }
