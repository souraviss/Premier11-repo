import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {



  token: any;
  userData: any = {};
  jsonData: any = {};
  wallet: any = {};
  friends: any = [];
  playingHistory: any = {};
  reward: any = {};
  rewardRecieved: any = [];
  selectPage: any = 'profile';
  pendingReward: any = [];
  rewordCritaria: any = [];
  responceData: any = [];
  device: any;
  showIcon = false;
  hidebutton = true;
  urlData: any = '';
  showFriends: boolean = false;
  hideFriends : boolean = false;
  location: any;
  pendingRewardDisplay: boolean = true;
  rewardhistrydisplay: boolean = true;


  constructor(private rest:ServicesService   , private router: Router) { }

  ngOnInit() {
     this.getData();
    this.fetchDataFromApi();
    this.location = 'www.google.com';
    console.log(this.location);


  }






  fetchDataFromApi(){

                this.rest.getProfileData(this.token).then(
                  result => {
                    this.jsonData = result;

                    console.log(this.jsonData);
                    this.getDataFromJSON();
                  },
                  error => {
                    // console.log(error);
                    this.router.navigate(['error']);
                    console.log('connection failed');
                  }
                );
  }


  getDataFromJSON() {
              // console.log('getDataFromJson');
              // console.log('Status' + this.jsonData.status);
              if (this.jsonData.status == 1) {
                this.userData = this.jsonData.data.user;
                this.wallet = this.jsonData.data.wallet;
                this.playingHistory = this.jsonData.data.playingHistory;
                this.friends = this.jsonData.data.friend;
                this.reward = this.jsonData.data.reward;
                this.rewardRecieved = this.jsonData.data.rewardRecieved;
                this.pendingReward = this.jsonData.data.rewardNotCollected;
                this.rewordCritaria = this.jsonData.data.rewardCriteria;

                 console.log(this.userData);
                 console.log(this.userData.name);
                 console.log(this.userData.userName);

                 console.log(this.wallet);
                 console.log(this.playingHistory);
                 console.log(this.friends);
                 console.log(this.reward);
                 console.log(this.rewardRecieved);
                 console.log(this.pendingReward);
                 console.log(this.rewordCritaria);


                 if(this.friends.length == 0) {

                   this.hideFriends = true;

                 }else{
                   this.showFriends = true;
                 }

                 if(this.rewardRecieved.length < 0){
                  this.rewardhistrydisplay = false;
                 }

                 if(this.pendingReward.length > 0){
                   this.pendingRewardDisplay =false;

                 }

              } else {
                console.log('data not Available');
              }
  }




  collectReward(level) {
                //console.log('collected Reword');
                this.rest.collectReword({ RewardLevel: level }, this.token).then(
                  result => {
                    this.responceData = result;
                    //console.log(result);
                    this.getData();
                  },
                  err => {
                    //console.log(err);
                    this.router.navigate(['error']);
                    console.log('connection failed');
                  }
                );
     }



  getData() {
    this.token = 'Bearer ' + localStorage.getItem('putoken');
    console.log(this.token);
    }


   gohome(){
    this.router.navigate(['/matchcenter/cricket/1']);
   }


   myResentHistory(){

    this.router.navigate(['recent-transaction-history']);
   }

   rewordcritaria(){


    this.router.navigate(['rewardcriteria']);

   }


   logout(){
     localStorage.removeItem('putoken');
     this.router.navigate(['']);
   }

   editprofile(){
    this.router.navigate(['editprofile']);
   }

   changePass() {
    this.router.navigate(['changepassword']);

  }




  //  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  twitter(e) {
    e.preventDefault();
    var twitterWindow = window.open(
      'https://twitter.com/share?url=' + document.URL,
      'twitter-popup',
      'height=350,width=600'
    );
    if (twitterWindow.focus) {
      twitterWindow.focus();
    }
    return false;
  }

  fb(e) {
    let url = 'www.google.com';
    e.preventDefault();
    var facebookWindow = window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + url,
      'facebook-popup',
      'height=350,width=600'
    );
    if (facebookWindow.focus) {
      facebookWindow.focus();
    }
    return false;
  }


}
