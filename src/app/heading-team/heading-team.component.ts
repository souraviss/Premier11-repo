import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heading-team',
  templateUrl: './heading-team.component.html',
  styleUrls: ['./heading-team.component.scss']
})
export class HeadingTeamComponent implements OnInit {
  @Input() matchUid: string;
  @Input() sportsType: number;
   token : any;
   matchData: any;
   team1Name: any;
   team2Name: any;
   matchStartTime: any;
   team1PhotoUrl: any;
   team2PhotoUrl: any;
   tid: any;
   tournamentName: any;
   contestdt: any;
   contestsinfo: any;
   teamCount: any;
   contestLength: any;

   contestId: any;
   numberOfContest: any;
   todayDate: any;
   today: any;
   matchdata: any={};
   allmatchstarttime: any;
   countdownTime: any;
  constructor(private rest: ServicesService , private _route : ActivatedRoute ) { }

  ngOnInit() {
    
    this.token =  localStorage.getItem('putoken');
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

  //   this._route.paramMap.subscribe(params => {  this.matchUid  = params.get('matchId') , this.sportsType = parseInt(params.get('ttypeid'))
  //   console.log(this.matchUid);
  //   console.log(this.sportsType);
  //  })

   this.loadData();

  }

  loadData() {
    console.log('Load data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');


        let token = 'Bearer ' + this.token;
        let bodyData = { MatchID: this.matchUid, tTypeID: this.sportsType };
        console.log(bodyData);
        this.rest.matchIndevidualData(bodyData, token).then(
          result => {
            this.matchData = result;
            console.log(this.matchData);
            this.team1Name = this.matchData.data.team1Name;

            this.team2Name = this.matchData.data.team2Name;
            this.matchStartTime = this.matchData.data.startTimeStamp;
            this.team1PhotoUrl = this.matchData.data.team1PhotoUrl;
            this.team2PhotoUrl = this.matchData.data.team2PhotoUrl;
            this.tid = this.matchData.data.tid;
            this.tournamentName = this.matchData.data.tournamentName;
          },
          err => {
            //console.log(err);

            // this.navCtrl.push('ErrorPage');
            console.log('connection failed!...');
          }
        );


    this.contestId = '0';




  }

  getconverteddate(value) {
    // let d = Date.parse(value) / 1000;
    let d = parseInt(value);
    let y: any = new Date();
    let z = Date.parse(y) / 1000;
    let x = d - z;
    const days: any = Math.floor(x / (3600 * 24));
    const hours: any = Math.floor(x / 3600);
    const minutes: any = Math.floor((x % 3600) / 60);
    const second: any = Math.floor(x % 60);
    let finalStr = '';
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    //var dayString = days < 10 ? '0' + days : days.toString();
    hoursString = hours < 10 ? '0' + hours : hours.toString();
    minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    secondsString = second < 10 ? '0' + second : second.toString();
    if (days > 4) {
      // let d = new Date(value);
      // let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      // finalStr = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
      let d = new Date(value * 1000);
      finalStr = d.toLocaleString();
    } else {
      finalStr = hoursString + 'h ' + minutesString + 'm ' + secondsString + 's';
    }
    return finalStr;
  }


}
