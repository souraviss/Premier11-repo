import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/service/services.service';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'ng4-social-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  responseData: any;
  username: string;
  password: string;
  name: string;
  email: string;
  phonenumber: string;
  dob: string;
  status: any;
  userData: any;
  verifyemailOtp: any;
  verifyphonenumberOtp: any;
  otp: any;
  referCode: any = '';
  ReferCode=new FormControl();
  gmailIconShow: boolean = false;
  facebookIconShow: boolean = false;
  message: any = '';
  user: FormGroup;
  verifyMail:boolean=false;
  verifyPhone:boolean=false;
  refferCode:any;
  checkPhonrNumber:any;
  checkEmail:any;
  phoneOtp:any='';
  public type = 'password';
  public showPass = false;
  disabledAgreement: boolean = true;
  Otpvarification: boolean = true;
  token: any;
  RegEmail=new FormControl('', [Validators.required,Validators.email]);
  RegPhone=new FormControl('', [Validators.required, Validators.minLength(10)]);
  RegPassword=new FormControl('', [Validators.required, Validators.minLength(6)]);
  otpVerify=new FormControl(); 
  public suser:any=SocialUser;



  constructor(private socialAuthService:AuthService, public restapi:ServicesService ,  public router: Router) { 
    this.user = new FormGroup({
      RegEmail: this.RegEmail,
      RegPhone: this.RegPhone,
       RegPassword: this.RegPassword,
       otpVerify:this.otpVerify,
       ReferCode:this.ReferCode
      });
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

  facebookLogin(){
    debugger;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=>{
      this.suser=userData;
      localStorage.setItem('user' , this.suser);
      console.log('localStorage   = '+ localStorage);
       console.log(userData);
    });
  }

  getEmailErrorMessage() {
    return this.RegEmail.hasError('required') ? 'Valid Email required' :
        this.RegEmail.hasError('email') ? 'Not a valid email' :
            '';
  }

  getPasswordErrorMessage(){
    return this.RegPassword.hasError('required')?'Valid Password required':'';
  }
  getPhoneErrorMessage(){
    return this.RegPhone.hasError('required')?'phone number required':
    this.RegPhone.hasError('minLength(6)')?'valid phone 6 number':'';
    //this.Password.hasError('Password')?'enter atleast 6 character':'';
  }

  user_signup(data) {
    debugger;
    console.log(data);
    console.log('referCode = ' + this.referCode);

    if (this.validation(data)) {

      console.log(data);
      let userData = {
        Email: data.value.RegEmail,
        PhoneNo: data.value.RegPhone,
        Password: data.value.RegPassword,
        ReferralCode:data.value.ReferCode,
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
            this.router.navigate(['/matchcenter/cricket/1']);
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


  validation(data) {

  if(data.value.RegPhone != this.checkPhonrNumber) {
    alert(typeof(data.value.RegPhone ));
    alert(typeof(this.checkPhonrNumber));
      alert('Please provide previous phone or not match otp')
    }else{
      return true;
    }
  }

Login_Register(){
  
}

  onInputTimePhone(data) {
    debugger;
    console.log(data);
    //this.otp = data;
    this.verifyphonenumberOtp = data;
    console.log('verificationotp   ' + this.verifyphonenumberOtp);
    console.log('otp    ' + this.otp);
    if(this.verifyphonenumberOtp==this.otp)
    {
      console.log("true");
      this.verifyPhone = true;
    }
    else{
      alert('Otp Not verified');
      console.log("false");
      this.verifyPhone = false;
    }
  }


  changeCheck(event){
    this.disabledAgreement = !event.checked;
  }


  phoneGetOtp(Phone) {
    debugger;
    console.log(Phone);
    // console.log(this.phonenumber);
    console.log(this.verifyphonenumberOtp);
    console.log(this.otp);

    if (Phone) {
      this.restapi.verifyPhoneInSignup({ phoneNumber: Phone }).then(
        result => {
          console.log(result);
          if(result['status']==1){
            this.otp = result['data'];
            console.log(result['phonenumber']);
            this.checkPhonrNumber = result['phonenumber'];
            this.facebookIconShow = true;
          }
          else{
            alert(result['error']);
           }
        },
        err => {
          console.log(err);
           this.router.navigate(['error']);
            // controller goes to error page
          console.log('connection failed!...');

        }
      );
    } else {
      alert('phone number cannot be null');

    }
  }


  onInputTimeRefercode(data){
    this.referCode = data;
  }


}
