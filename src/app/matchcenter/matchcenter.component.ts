import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';



import { FormGroup  , FormControl  , Validators } from '@angular/forms';

import { ServicesService } from '../service/services.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { LoginComponent } from '../login/login.component';



export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-matchcenter',
  templateUrl: './matchcenter.component.html',
  styleUrls: ['./matchcenter.component.scss']
})
export class MatchcenterComponent implements OnInit {
  displayMymatch: boolean = false;
  showFiller = false;
  page = 0;
  pageType = 'matchcenter';
  eventType = 'upcomming';
  myContestEventType = 'upcomming';
  matchCenterEventType = 'upcomming';
  select: any;
  status: any;
  selectedSegments = this.pageType + '-' + this.eventType;
  responseData: any;
  allmatchstarttime = [];
  matchdata = [];
  matchDate: any;
  today: any;
  countdownTime = [];
  todayDate: any;
  responsesportstypedata: any;
  getsportstypedata = [];
  upcommingMatch: any = [];
  liveMatch: any = [];
  completedMatch: any = [];
  selectedSport: number;
  sportsTypeData: any;
  token: any;
  segmentPage = false;
  turnamentId: any;
  matchCenterData: any;
  myContestData: any;
  selectPage: any = 'home';
  notificationCount: Number = 0;
  banners: any;
  haveNoUpcommingData:any=false;
  haveNoLiveData:any=false;
  haveNocompletedData:any=false;

  topValues: any;
  matchId: number;
  bodyData: any;

  constructor(public rest : ServicesService , public router : Router , public dialog: MatDialog , private  _route: ActivatedRoute ) {

          this.loadDataFromApi();


   }

  id: any;
  ngOnInit() {
             this._route.paramMap.subscribe(params => {  this.id  = params.get('id')
              this.selectedSport = this.id;

           this.loadDataFromApi();
           this.getmatchDetails(this.selectedSport);


          })

                 setInterval(() => {
            this.todayDate = new Date();
            this.today = Date.parse(this.todayDate) / 1000;
            for (let i = 0; i < this.matchdata.length; i++) {
              if (this.matchdata[i].status == 'C') {
                this.allmatchstarttime[i] = Date.parse(this.matchdata[i].matchStartTime) / 1000;
                this.countdownTime.push(this.allmatchstarttime[i] - this.today);
              }
            }
          }, 1000);



  }




  loadDataFromApi() {
             this.token =  localStorage.getItem('putoken');
              console.log('token == ' + this.token);


              if(this.token == null)
              {

               this.displayMymatch = false;

              }else{

                this.displayMymatch = true;


              }
                               //  this.rest.getSportstype().then(
                  //     result => {
                  //      this.responsesportstypedata = result;

                  //      this.getsportstypedata = this.responsesportstypedata;

                  //      this.selectedSport = this.getsportstypedata[0].ttypeUid;



                  //       this.getBanner();
                  //       this.getmatchDetails(this.selectedSport);
                  //       this.getNotification();

                  //     },
                  //     err => {

                  //       alert('SportsType');
                  //       this.router.navigate(['ErrorPage']);

                  //     }
                  //   );
    }



  getconverteddate(value) {
                let d = parseInt(value);
                let y: any = new Date();
                let z = Date.parse(y) / 1000;
                let x = d - z;


                if (x < 0) {

                  return value;

                } else {


                  const days: any = Math.floor(x / (3600 * 24));
                  const hours: any = Math.floor(x / 3600);
                  const minutes: any = Math.floor((x % 3600) / 60);
                  const second: any = Math.floor(x % 60);

                  let finalStr = '';
                  var hoursString = '';
                  var minutesString = '';
                  var secondsString = '';
                  hoursString = hours < 10 ? '0' + hours : hours.toString();
                  minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
                  secondsString = second < 10 ? '0' + second : second.toString();
                  if (days > 4) {
                    let d = new Date(value * 1000);


                    finalStr = d.toLocaleString();

                   } else {

                    finalStr = hoursString + 'h ' + minutesString + 'm ' + secondsString + 's';

                  }

                  return finalStr;
                }
  }






    setPageType(value: string) {

                          console.log('set page type ====================================================================================');

                           this.haveNocompletedData=false;
                           this.haveNoLiveData = false;
                           this.haveNoUpcommingData = false;
                           this.matchdata = [];
                           this.upcommingMatch = [];
                           this.completedMatch = [];
                           this.liveMatch = [];
                          //  console.log(this.matchdata);        // 0
                          //  console.log(this.upcommingMatch);   // cricket upcoming com
                          //  console.log(this.completedMatch);   // c com
                          //  console.log(this.liveMatch);        // live com
                           if (value == 'matchcenter') {
                             this.eventType = this.matchCenterEventType;
                            //  console.log('1');
                            //  console.log(this.eventType);    // upcoming
                                   if (this.matchCenterData) {
                                     this.matchdata = this.matchCenterData;
                                    //  console.log('1.1');
                                    //  console.log(this.matchdata); // matchdata all type =  u c l matches
                                   } else {
                                     this.matchdata = [];
                                    //  console.log('1.2');
                                    //  console.log(this.matchdata);
                                   }
                                   //console.log(this.matchdata);
                                   this.segmentPage = false;
                           } else if (value == 'mycontest') {

                                       this.eventType = this.myContestEventType;

                                      //  console.log('2');
                                      //  console.log(this.eventType);
                                       if (this.myContestData) {
                                         this.matchdata = this.myContestData;
                                        //  console.log('2.1');
                                        //  console.log(this.matchdata);
                                       } else {
                                         this.matchdata = [];
                                        //  console.log('2.2');
                                        //  console.log(this.matchdata);
                                       }
                                       this.segmentPage = true;
                           }
                           for (let i = 0; i < this.matchdata.length; i++) {
                            //  console.log('3');
                            //  console.log(this.matchdata.length);
                             if (this.matchdata[i].status == 'U') {
                               this.upcommingMatch.push(this.matchdata[i]);
                              //  console.log('3.1');
                              //  console.log(this.matchdata[i]);
                              //  console.log(this.upcommingMatch);
                             } else if (this.matchdata[i].status == 'L') {
                              //  console.log('3.2');

                               this.liveMatch.push(this.matchdata[i]);


                             } else if (this.matchdata[i].status == 'C' || this.matchdata[i].status == 'A') {
                               this.completedMatch.push(this.matchdata[i]);

                             }
                           }
                           if(this.upcommingMatch.length<=0){
                             this.haveNoUpcommingData =  true;
                           }if(this.liveMatch.length<=0){
                             this.haveNoLiveData = true;
                           }if(this.completedMatch.length<=0){
                             this.haveNocompletedData = true;
                           }



                           this.pageType = value;
                           this.changeSelectedSegment();
   }


  getmatchDetails(sportstype) {
                this.upcommingMatch = [];
                this.completedMatch = [];
                this.liveMatch = [];
                // console.log("sportstype==============================================================================");
                // console.log(sportstype);
                // console.log(this.upcommingMatch);
                // console.log(this.completedMatch);
                // console.log( this.liveMatch);
                this.sportsTypeData = parseInt(sportstype);
                // console.log( this.sportsTypeData );
                this.selectedSport = this.sportsTypeData;
                // console.log( this.selectedSport);
                let token = 'Bearer ' + this.token;
                // console.log('token in all matches pages -----------------------------------------------------')
                //  console.log(this.token);
                //   console.log('typeuid' + this.sportsTypeData);
                this.rest.allmatches(this.sportsTypeData, token).then(
                  result => {
                    this.responseData = result;
                    //  console.log(result);
                    console.log('data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    console.log(this.responseData);
                    this.matchCenterData = this.responseData.data.mCenter;
                    this.myContestData = this.responseData.data.mContest;
                    // console.log(this.matchCenterData);
                    // console.log(this.myContestData);
                    this.matchdata = this.matchCenterData;
                    // console.log(this.matchdata);



                    this.setPageType(this.pageType);

                  },
                  err => {

                    alert('AllMatches');

                    this.router.navigate(['ErrorPage']);

                    // console.log('connection failed!...');
                  }
                );



  }







  changeSelectedSegment() {
       this.selectedSegments = this.pageType + '-' + this.eventType;
  }




  openDialog(): void {

          const dialogRef = this.dialog.open(LoginComponent, {

            //height: '800px',
            width: '800px',

          });

  }


  back(){

          this.router.navigate(['login']);
  }


  getBanner(){

  }

  getNotification(){

  }


  getMatchdetails(matchUid){          // get selected match Id and navigate to Contest Page
debugger;
    this.matchId = matchUid

    this.bodyData = { MatchID: this.matchId, tTypeID: this.selectedSport };
    this.router.navigate(['/contest',this.matchId ,this.selectedSport]);


    }





}

