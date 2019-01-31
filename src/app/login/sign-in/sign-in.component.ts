import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService, SocialUser, FacebookLoginProvider } from 'ng4-social-login';
import * as firebase from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginemail=new FormControl('', [Validators.required, Validators.email]);
  responseData: any;
  click: boolean = false;
  userName: any;
  loginpassword=new FormControl('', [Validators.required]);
  userData: any;
  userinfo: any = {};
  fcmId: any;
  loginForm: FormGroup;
  gEmail: any;
  gname: any;
  gUid: any;
  guser: any;
  gVerified: boolean;
  public user:any=SocialUser;

  constructor(private dialog:MatDialog,private socialAuthService:AuthService,public dialogRef: MatDialogRef<SignInComponent>, public router: Router ,  public restapi: ServicesService  , private afAuth: AngularFireAuth  ) {
    this.loginForm = new FormGroup({
      loginemail: this.loginemail,
      loginpassword: new FormControl('', [Validators.required]),
    });
    debugger;
    var token=localStorage.getItem('putoken');


    if(token)
    {
      this.router.navigate(['/matchcenter/cricket/1']);
      this.dialogRef.close();
    }
   }

  ngOnInit() {
    // if(localStorage.getItem('user')){
    
      

    //   this.router.navigate(['/matchcenter/cricket/1']);
  
    //  }else {
  
    //  }
  }

  user_login(username, password) {
    debugger;
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
      //  this.dialogRef.disableClose;       

        this.restapi.login(userData).then(
          result => {
            debugger;
            this.responseData = result;
            console.log(this.responseData);
            localStorage.setItem('putoken' , this.responseData.data);
            localStorage.setItem('name' , this.user.name);
            localStorage.setItem('email',this.user.email);
            // localStorage.setItem('username',userData.Email);
            // localStorage.setItem('password',userData.Password);
            console.log(this.responseData.data);
            // console.log('responsedata in login page');
            // console.log(this.responseData);
          if (this.responseData.status == 1) {
              alert('you have successfully login');
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
              debugger;
              this.dialog.open(SignInComponent,{
                data:{}
              });
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
    
    
      getEmailErrorMessage() {
        return this.loginemail.hasError('required') ? 'Valid Email required' :
            this.loginemail.hasError('email') ? 'Not a valid email' :
                '';
      }
    
      getPasswordErrorMessage(){
        return this.loginpassword.hasError('required')?'Valid password required':'';
        //this.Password.hasError('Password')?'enter atleast 6 character':'';
      }
    
      facebookLogin(){
        debugger;
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=>{
          this.user=userData;
          localStorage.setItem('name' , this.user.name);
          localStorage.setItem('putoken',this.user.token);
          localStorage.setItem('email',this.user.email);
          console.log('localStorage   = '+ localStorage);
           console.log(userData);
        });
      }
      // GoogleLogin(){
      //   debugger;
      //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=>{
      //       this.user=userData;
      //       console.log(userData);
      //     });
      //    }
    googlelogin() {
    debugger;
      // var user;
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      this.user = firebase.auth().currentUser;
      console.log(this.user);
      //localStorage.setItem('user' , this.user);
      //console.log('localStorage   = '+ localStorage);
      localStorage.setItem('name' , this.user.displayName);
      localStorage.setItem('putoken',this.user.refreshToken);
      localStorage.setItem('email',this.user.email);
      //console.log('auth>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      //alert(this.user);
      //alert(this.user);
      //alert('entering');
      var name, email, photoUrl, uid, emailVerified;
    
    
      if (!this.user) {
        alert('login again');
        //this.router.navigate(['/matchcenter/cricket/1']);
      }else {
        this.gname = this.user.displayName;
        this.gEmail = this.user.email;
        emailVerified = this.user.emailVerified;
        this.gUid = this.user.uid;
      // alert(this.user.email);
       alert('you have sucessfully loggedin');
      //  if(this.gUid)
      //  {
      //   this.router.navigate(['/matchcenter/cricket/1']);
      //  }
      // alert('stop if');
       //this.router.navigate(['/matchcenter/cricket/1']);
       //alert(this.gUid);
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
    
      user_signup() {
        if (this.loginForm.valid) {
    
    
          this.loginForm.reset();
        }
        this.router.navigate(['register']);
      }
    
      backpage() {
    
        // this.navCtrl.popToRoot();
      }
    
    

}
