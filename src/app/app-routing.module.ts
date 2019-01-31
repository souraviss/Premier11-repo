import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { MatchcenterComponent } from './matchcenter/matchcenter.component';
import { FleshScreenComponent } from './flesh-screen/flesh-screen.component';

import { ContestsComponent } from './contests/contests.component';
import { AllContextComponent } from './all-context/all-context.component';
import { JoinedContextComponent } from './joined-context/joined-context.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { ViewPlayerInfoComponent } from './view-player-info/view-player-info.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { AllcontestComponent } from './allcontest/allcontest.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EmailvarificationComponent } from './emailvarification/emailvarification.component';
import { ProfileComponent } from './profile/profile.component';
import { RecenttransactionComponent } from './recenttransaction/recenttransaction.component';
import { RewardcriteriaComponent } from './rewardcriteria/rewardcriteria.component';



const routes: Routes = [
  {path: '' , component: FleshScreenComponent, pathMatch:'full' },
 { path: 'login' , component:LoginComponent },
 { path: 'error' , component: ErrorComponent},
  {path:'AllContext/:matchId',component: AllContextComponent},
  {path:'JoinedContext/:matchId',component: JoinedContextComponent},
  {path:'ViewTeam/:PlayerType/:matchId',component: ViewPlayerInfoComponent},
  {path:'CreateTeam/:matchId',component: CreateTeamComponent},
 { path: 'matchcenter/:name/:id' , component: MatchcenterComponent},
 { path: 'contest/:matchId/:ttypeid' , component: ContestsComponent},
 { path: 'profile'   ,   component: ProfileFormComponent },
{ path: 'allcontest' , component: AllcontestComponent},
{ path: 'changepassword' , component: ChangepasswordComponent},
{path:'email' , component: EmailvarificationComponent},
{path:'profile' , component: ProfileComponent },
{path:'recent-transaction-history'  , component: RecenttransactionComponent},
{path: 'rewardcriteria' , component: RewardcriteriaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
