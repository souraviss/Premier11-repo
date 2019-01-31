import { Component, OnInit } from '@angular/core';
import { FormGroup  , FormControl  , Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ServicesService } from '../service/services.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

import {MatDialogRef} from '@angular/material/dialog';
import { AuthService, FacebookLoginProvider, SocialUser } from 'ng4-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  responseData: any;
  click: boolean = false;
  userName: any;
  password: any;
  userData: any;
  userinfo: any = {};
  fcmId: any;
  loginForm: FormGroup;
  gEmail: any;
  gname: any;
  gUid: any;
  guser: any;
  gVerified: boolean;
  public type = 'password';
  public showPass = false;
  public user:any=SocialUser;
  RegEmail:FormControl;
  RegPhone:FormControl;
  RegPassword:FormControl;
  referCode: string;

  constructor(private socialAuthService:AuthService,public dialogRef: MatDialogRef<LoginComponent>, public router: Router,public restapi: ServicesService, private afAuth: AngularFireAuth  ) {

    this.user = new FormGroup({
      RegEmail: new FormControl('', [Validators.required,Validators.email]),
      RegPhone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      RegPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    // console.log(localStorage.getItem('putoken'));

    // if(localStorage.getItem('putoken')){
    //   alert('login1');

    //   this.router.navigate(['/matchcenter/cricket/1']);
    //  }

   }

  ngOnInit() {
  }

  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  getEmailErrorMessage() {
    return this.RegEmail.hasError('required') ? 'Valid Email required' :
        this.RegEmail.hasError('email') ? 'Not a valid email' :
            '';
  }

  getPasswordErrorMessage(){
    return this.RegEmail.hasError('required')?'Valid password required':'';
    //this.Password.hasError('Password')?'enter atleast 6 character':'';
  }


  user_login(username, password) {

    // let page = this.navparam.get('pagename');
    // let matchUid = this.navparam.get('matchUid');
    // let sportsType = this.navparam.get('sportsType');
    // let contestId = this.navparam.get('contestId');
    // let pagelength = this.navparam.get('pagelength');

    let userData = {
      Email: username,
      Password: password,

    };
    console.log(userData);

    this.restapi.login(userData).then(
      result => {
        this.responseData = result;
        localStorage.setItem('putoken' , this.responseData.data);
        // console.log('responsedata in login page');
        // console.log(this.responseData);
      if (this.responseData.status == 1) {
          alert('you have successfully loggin');
          this.router.navigate(['/matchcenter/cricket/1']);

          // if (page != undefined) {
          //   let data;
          //   if (contestId == '0') {
          //     data = { matchUid: matchUid, sportsType: sportsType };
          //   } else {
          //     data = {
          //       matchUid: matchUid,
          //       sportsType: sportsType,
          //       ContestId: contestId,
          //     };
          //   }
          //   this.navCtrl.remove(pagelength, this.navCtrl.length() - pagelength + 1);
          //   this.navCtrl.pop().then(() => {
          //     this.navCtrl.push(page, data);
          //   });
          // } else {

          //   this.navCtrl.setRoot('MatchcenterPage');

          // }

        } else {
          alert(this.responseData.error);

        }
      },
      err => {
        //console.log(err);
        this.router.navigate(['error']);
        console.log('connection failed!...');

      }
    );
  }




googlelogin() {

  var user;
  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  user = firebase.auth().currentUser;
  localStorage.setItem('user' , user);
  console.log('localStorage   = '+ localStorage);

  console.log('auth>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log(user);
  alert('entering');
  var name, email, photoUrl, uid, emailVerified;


  if (!user) {
    alert('login again');
  }else {
    this.gname = user.displayName;
    this.gEmail = user.email;
    emailVerified = user.emailVerified;
    this.gUid = user.uid;
   alert(emailVerified);
   alert('you have sucessfully loggedin');
   alert('stop if');
   this.router.navigate(['/matchcenter/cricket/1']);
   alert(this.gUid);

  }

  // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  //   var user = firebase.auth().currentUser;

  //   console.log(user);


  //   if (user !== null) {



  //     console.log(user);
  //     console.log('email   ' + user.email);
  //     console.log('name   ' + user.displayName);
  //     console.log('photo utl   ' + user.photoURL);
  //     console.log('providerdata   ' + user.providerData);
  //     console.log('refreshToken    ' + user.refreshToken);
  //     console.log( 'uid    '  + user.uid);
  //     console.log('photonumber   ' + user.phoneNumber);
  //     console.log('metadata    ' +  user.metadata);


  //     alert('wait');
  //    this.router.navigate(['/matchcenter/cricket/1']);

  //   }else {
  //     alert('No User');


  //    }



}

facebookLogin(){
  debugger;
  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=>{
    this.user=userData;
    localStorage.setItem('user' , this.user);
    console.log('localStorage   = '+ localStorage);
     console.log(userData);
  });
}

  // user_signup() {
  //   if (this.user.valid) {


  //     this.user.reset();
  //   }
  //   this.router.navigate(['register']);
  // }
  user_signup(data) {
    debugger;
    console.log(data);
    console.log('referCode = ' + this.referCode);

    if (this.validation(data)) {

      console.log(data);
      let userData = {
        Email: data.value.email,
        PhoneNo: data.value.phone,
        Password: data.value.password,
        ReferralCode:this.referCode,
      };
      console.log("userdata" + userData);
      this.restapi.signup(userData).then(
        result => {
          this.responseData = result;
          console.log('responsedata in signup page');
          console.log(this.responseData);
          console.log(this.responseData.data);

          localStorage.setItem('putoken' , this.responseData.data);

          alert(this.responseData.status);
          if (this.responseData.status == 1) {
            alert('sucessfully Added');
            this.router.navigate(['matchcenter']);
              // After Sucessfully added controller goes to the profile page

          } else {

            alert('give proper input');
          }
        },
        err => {
          console.log(err);
          this.router.navigate(['error']);
          console.log('connection failed!...');
        }
      );
    } else {
      alert('fill all the field');
    }
  }

  displayModalPopUp(changeValue:boolean){
    debugger;
    alert(changeValue);
  }

  validation(data: any): any {
    
  }

  backpage() {

    // this.navCtrl.popToRoot();
  }










}
