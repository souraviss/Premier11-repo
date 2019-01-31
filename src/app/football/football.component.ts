import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.scss']
})
export class FootballComponent implements OnInit {



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

  constructor(public rest : ServicesService , public router : Router ) {

    this.loadDataFromApi();
   }

  ngOnInit() {

  }



  getBanner(){

  }

  getNotification(){

  }


  loadDataFromApi() {

    console.log('global token football page--------------------------------------------');


      this.token =  localStorage.getItem('putoken');
      console.log('token == ' + this.token);



    this.rest.getSportstype().then(
      result => {
        console.log(result);
        this.responsesportstypedata = result;
        console.log('getsportstypedata football page---------------------------------------------------------------------------------------------- ');
        console.log(this.responsesportstypedata);

        this.getsportstypedata = this.responsesportstypedata;


        this.selectedSport = this.getsportstypedata[1].ttypeUid;



        this.getBanner();
        this.getmatchDetails(this.selectedSport);
        this.getNotification();
        //loader.dismiss();
    // this.dismissLoader();
      },
      err => {
        //loader.dismiss();
   // this.dismissLoader();
        alert('SportsType');
        this.router.navigate(['ErrorPage']);
        // console.log('connection failed!...');
        // console.log(err);
      }
    );
    //console.log(this.pageType);
  }


  setPageType(value: string) {

    console.log('set page type football page-------------------------------------------- ====================================================================================');
    console.log(value);    // matchcenter
     //console.log(value);
     this.haveNocompletedData=false;
     this.haveNoLiveData = false;
     this.haveNoUpcommingData = false;
     this.matchdata = [];
     this.upcommingMatch = [];
     this.completedMatch = [];
     this.liveMatch = [];
     console.log(this.matchdata);        // 0
     console.log(this.upcommingMatch);   // cricket upcoming com
     console.log(this.completedMatch);   // c com
     console.log(this.liveMatch);        // live com
     if (value == 'matchcenter') {
       this.eventType = this.matchCenterEventType;
       console.log('1');
       console.log(this.eventType);    // upcoming
             if (this.matchCenterData) {
               this.matchdata = this.matchCenterData;
               console.log('1.1');
               console.log(this.matchdata); // matchdata all type =  u c l matches
             } else {
               this.matchdata = [];
               console.log('1.2');
               console.log(this.matchdata);
             }
             //console.log(this.matchdata);
             this.segmentPage = false;
     } else if (value == 'mycontest') {

                 this.eventType = this.myContestEventType;

                 console.log('2');
                 console.log(this.eventType);
                 if (this.myContestData) {
                   this.matchdata = this.myContestData;
                   console.log('2.1');
                   console.log(this.matchdata);
                 } else {
                   this.matchdata = [];
                   console.log('2.2');
                   console.log(this.matchdata);
                 }
                 this.segmentPage = true;
     }
     for (let i = 0; i < this.matchdata.length; i++) {
       console.log('3');

       if (this.matchdata[i].status == 'U') {
         this.upcommingMatch.push(this.matchdata[i]);


       } else if (this.matchdata[i].status == 'L') {
         console.log('3.2');

         this.liveMatch.push(this.matchdata[i]);


       } else if (this.matchdata[i].status == 'C' || this.matchdata[i].status == 'A') {
         this.completedMatch.push(this.matchdata[i]);
         console.log('3.3');

       }
     }



     console.log(this.upcommingMatch);
     console.log(this.liveMatch)

     console.log(this.completedMatch);
     console.log(this.matchdata);        // complited matches


     if(this.upcommingMatch.length<=0){
       this.haveNoUpcommingData =  true;
     }if(this.liveMatch.length<=0){
       this.haveNoLiveData = true;
     }if(this.completedMatch.length<=0){
       this.haveNocompletedData = true;
     }


     //console.log('pageTypes- ' + this.pageType);
     this.pageType = value;

     // change this part

     //this.eventType = 'upcomming';
     this.changeSelectedSegment();

    console.log('global football page-------------------------------------------- ======================================');
    console.log(this.token);


    console.log(this.upcommingMatch);
    console.log(this.liveMatch);
    console.log(this.completedMatch);
   }


  getmatchDetails(sportstype) {
    this.upcommingMatch = [];
    this.completedMatch = [];
    this.liveMatch = [];
    console.log("sportstype football page-------------------------------------------- ==============================================================================");
    console.log(sportstype);
    console.log(this.upcommingMatch);
    console.log(this.completedMatch);
    console.log( this.liveMatch);
    this.sportsTypeData = parseInt(sportstype);
    console.log( this.sportsTypeData );
    this.selectedSport = this.sportsTypeData;
    console.log( this.selectedSport);
    let token = 'Bearer ' + this.token;
    console.log('token in all matches pages football page-------------------------------------------- -----------------------------------------------------')
     console.log(this.token);
      console.log('typeuid' + this.sportsTypeData);
    this.rest.allmatches(this.sportsTypeData, token).then(
      result => {
        this.responseData = result;
         console.log(result);
        //console.log(this.responseData.data);
        this.matchCenterData = this.responseData.data.mCenter;
        this.myContestData = this.responseData.data.mContest;
        console.log(this.matchCenterData);
        console.log(this.myContestData);
        this.matchdata = this.matchCenterData;
        console.log(this.matchdata);



        this.setPageType(this.pageType);

      },
      err => {

        alert('AllMatches');

        this.router.navigate(['ErrorPage']);

        console.log('connection failed!...');
      }
    );



  }







  changeSelectedSegment() {
    this.selectedSegments = this.pageType + '-' + this.eventType;
  }





}
