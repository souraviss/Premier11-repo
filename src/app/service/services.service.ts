import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



let serverUrl = 'http://magicmindpremier11.azurewebsites.net/';



let signupUrl = serverUrl + 'api/UserAccount/AddUsers';
// let signinUrl = serverUrl + 'api/Login/LoginByEmail';
let signinUrl = serverUrl + 'api/Login/LoginByEmail1';
let matchesUrl = serverUrl + 'api/Match/GetMatchData';
let tournamentTypeUrl = serverUrl + 'api/Match/SportsType';
let getPlayerTypeUrl = serverUrl + 'api/Players/GetPlayersType';
let getMatchPlayersUrl = serverUrl + 'api/Players/GetPlayers';
let getContestInfoUrl = serverUrl + 'api/Contests/GetContestsData';
let getContestTypeUrl = serverUrl + 'api/Contests/GetContestType';
let addTeamUrl = serverUrl + 'api/UserTeam/AddUserTeam';
let updateTeamUrl = serverUrl + 'api/UserTeam/UpdateUserTeam';
let sendOTPForForgetPasswordUrl = serverUrl + 'api/Login/OtpSend';
let verifiOtpForForgorPasswordUrl = serverUrl + 'api/Login/CheckOTPForForgotPassword';
let getOtpForLoginUrl = serverUrl + 'api/Login/LoginByMobile';
let verifiOtp = serverUrl + 'api/Login/CheckOTP';
let resetPasswordUrl = serverUrl + 'api/Login/newPassword';
let verifyPhoneInSignupUrl = serverUrl + 'api/Login/RegistrationByMobile';
let GetTeamPlayerInfo = serverUrl + 'api/UserTeam/TeamInfo';
// contests
let joinedContestUrl = serverUrl + 'api/UserContest/GetUserContestByMatch';
let matchIndevidualData = serverUrl + 'api/Match/GetIndivisualMatchData';


let getEditProfileDataUrl = serverUrl + 'api/UserAccount/getUser';

//Profile form
let saveEditProfileUrl = serverUrl + 'api/UserAccount/userEdit';
let changePasswordUrl = serverUrl + 'api/UserAccount/ChangePassword';  // for changing password

// PROFIE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let UserProfileUrl = serverUrl + 'api/UserAccount/myProfile';
let collectRewordUrl = serverUrl + 'api/UserContest/ClaimsReward';
let myTransactionUrl = serverUrl + 'api/UserAccount/myTransaction';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  token: any;
  public networkConnectionState: boolean = true;

  constructor( public http: HttpClient) { }

  // getting signup ------------------------------------------------------------------------------------------------
  signup(credintials) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json; charset=utf-8');
      this.http.post(signupUrl, credintials, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        },
        () => {}
      );
    });
  }


  //Rest api for getting Team Data
  ViewTeamSelection(token,MatchId,Sportstype)
  {
        return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', token);
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('access-control-allow-credentials', 'true');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        let matchparam = { MatchId: MatchId,SportType:Sportstype };
        this.http.post(GetTeamPlayerInfo, matchparam, { headers: headers }).subscribe(
          res => {
            debugger;
            resolve(res);
          },
          err => {
            reject(err);
          },
          () => {}
        );
      });
  }

  // rest api for getting phone otp
  verifyPhoneInSignup(phonenumber) {
    console.log(phonenumber);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    return new Promise((resolve, reject) => {
      this.http.post(verifyPhoneInSignupUrl, phonenumber, { headers: headers }).subscribe(
        res => {
          console.log('inside post');
          console.log(res);
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

// login ----------------------------------------------------------------------------------------------------------------------------------

  login(credintials) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json; charset=utf-8');
      headers.append('access-control-allow-credentials', 'true');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      // console.log(credintials);
      this.http.post(signinUrl, credintials, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        },
        () => {}
      );
    });
  }



  // matchcenter/cricket starts -----------------------------------------------------------------------------------------------------------------------------

  allmatches(credintials, token) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      console.log('all match header'+ headers);
      headers = headers.append('Authorization', token);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');

      // console.log(credintials);
      this.http.post(matchesUrl, credintials, { headers: headers }).subscribe(
        res => {
          resolve(res);
          //loader.dismiss();
        },
        err => {
          reject(err);
          //loader.dismiss();
        },
        () => {
          //loader.dismiss();
        }
      );
    });
  }

  //get All context by matchId---------------------------
  AllContextByMatchId(token,matchId){
    return new Promise((resolve, reject) => {
      debugger;
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', token);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      headers.append('access-control-allow-credentials', 'true');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      let matchparam = { matchId: matchId };
      this.http.post(getContestInfoUrl, matchparam, { headers: headers }).subscribe(
        res => {
          debugger;
          resolve(res);
        },
        err => {
          reject(err);
        },
        () => {}
      );
    });
  }
//---Get data for user Context by match
  AllUserContextByMatchId(token,matchId){
    return new Promise((resolve, reject) => {
      debugger;
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', token);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      headers.append('access-control-allow-credentials', 'true');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      let matchparam = { matchId: matchId };
      this.http.post(joinedContestUrl, matchparam, { headers: headers }).subscribe(
        res => {
          debugger;
          resolve(res);
        },
        err => {
          reject(err);
        },
        () => {}
      );
    });
  }


  getSportstype() {
    return new Promise((resolve, reject) => {
      this.http.get(tournamentTypeUrl).subscribe(
        res => {
          resolve(res);
          //console.log(res);
        },
        err => {
          reject(err);
          // console.log(err);
        },
        () => {}
      );
    });
  }




  // contests page services ---------------------------------------------------------------------------


  matchIndevidualData(bodyData, token) {
    console.log('inside data >>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(bodyData);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Authorization', token);
    return new Promise((resolve, reject) => {
      console.log('inside promis');
      this.http.post(matchIndevidualData, bodyData, { headers: headers }).subscribe(
        res => {
           console.log('inside post');
           console.log(res);
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }




  getJoinedContestDetails(matchId, token) {
    // let loader = this.loadingController.create({
    //   content: 'Please wait..',
    // });
    //loader.present();
    //console.log(matchId);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      headers = headers.append('Authorization', token);
      this.http.post(joinedContestUrl, matchId, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
          //loader.dismiss();
        },
        () => {
          //loader.dismiss();
        }
      );
    });
  }
  getContestInfo(thematchId, token) {
    // console.log('in P11data');
    // console.log(thematchId);
    // console.log(this.token);
    // let loader = this.loadingController.create({
    //   content: 'Please wait..',
    // });
    // loader.present();

    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', token);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');

      let matchparam = { matchId: thematchId };
      // console.log(matchparam);
      // console.log(headers);
      this.http.post(getContestInfoUrl, matchparam, { headers: headers }).subscribe(
        res => {
          resolve(res);
          //console.log(res);
          //loader.dismiss();
        },
        err => {
          reject(err);
          // loader.dismiss();
        },
        () => {
          // loader.dismiss();
        }
      );
    });
  }




  changePassword(credintials, token) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', token);
      headers = headers.append('Content-Type', 'application/json; charset=utf-8');
      this.http.post(changePasswordUrl, credintials, { headers: headers }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        },
        () => {}
      );
    });
  }





getEditProfileData(token) {
let headers = new HttpHeaders();
headers = headers.append('Content-Type', 'application/json; charset=utf-8');
headers = headers.append('Authorization', token);
return new Promise((resolve, reject) => {
  this.http.get(getEditProfileDataUrl, { headers: headers }).subscribe(
    res => {
      resolve(res);
    },
    err => {
      reject(err);
    }
  );
});
}


saveEditProfile(bodyData, token) {
  //console.log(bodyData);
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json; charset=utf-8');
  headers = headers.append('Authorization', token);
  return new Promise((resolve, reject) => {
    this.http.post(saveEditProfileUrl, bodyData, { headers: headers }).subscribe(
      res => {
        resolve(res);
        // console.log(res);
      },
      err => {
        reject(err);
        // console.log(err);
      }
    );
  });
}


// PROFILE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


getProfileData(token) {

  let headers = new HttpHeaders({
    Authorization: token,
  });
  return new Promise((resolve, reject) => {
    this.http.get(UserProfileUrl, { headers: headers }).subscribe(
      res => {
        resolve(res);
      },
      err => {
        reject(err);

      },
      () => {

      }
    );
  });
}



collectReword(body, token) {

  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json; charset=utf-8');
  headers = headers.append('Authorization', token);
  return new Promise((resolve, reject) => {
    this.http.post(collectRewordUrl, body, { headers: headers }).subscribe(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      }
    );
  });
}


myTransaction(token) {
  let headers = new HttpHeaders();
  headers = headers.append('Content-Type', 'application/json; charset=utf-8');
  headers = headers.append('Authorization', token);
  return new Promise((resolve, reject) => {
    this.http.get(myTransactionUrl, { headers: headers }).subscribe(
      res => {
        resolve(res);
        // console.log(res);
      },
      err => {
        reject(err);
        //console.log(err);
      }
    );
  });
}

}


