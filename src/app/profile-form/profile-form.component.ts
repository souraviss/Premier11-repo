import { Component, OnInit } from '@angular/core';

import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  UserNameDis: boolean = true;
  jsonData: any = [];
  token: any;
  dob: any;
  teamName: any;
  gender: any = '';
  address: any;
  city: any;
  donotPlay: boolean = false;
  state: any = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Orissa',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telagana',
    'Tripura',
    'Uttaranchal',
    'Uttar Pradesh',
    'West Bengal',
  ];
  selectedvalue: any;
  selectedState: any;
  previousState: any;
  pin: any = 0;
  photoId: any;
  name: any = '';
  username: any = '';
  maleChecked: boolean = false;
  femaleChecked: boolean = false;
  photo: any;
  fullProfileType: any;
  showMessage: boolean = false;
  loader: any;
  bday: any;
  phone: number
  email: any;
  emailVerify: boolean;
  password: any;
  country: any;
  emailverified : boolean = true;


  constructor( private rest: ServicesService  , private router : Router  ) {

    this.token = 'Bearer ' + localStorage.getItem('putoken');
     console.log(this.token);
    this.rest.getEditProfileData(this.token).then(
      result => {

        this.jsonData = result['data'];
        console.log(this.jsonData);
        console.log(this.jsonData.dob);
        console.log(this.jsonData.city);
        this.selectedState = this.jsonData.state;
        this.city = this.jsonData.city;
        this.name = this.jsonData.name;
        this.username = this.jsonData.userName;
        this.address = this.jsonData.address;
        this.dob = this.jsonData.dob;
        this.gender = this.jsonData.gender;
        this.pin = this.jsonData.pin;
        this.phone = this.jsonData.phoneNo;
        this.email = this.jsonData.email;
        this.country = this.jsonData.country;
        this.emailVerify = this.jsonData.emailVerify;
        this.password = this.jsonData.password;






        for (let i = 0; i < this.state.length; i++) {
          console.log(this.state[i] == this.jsonData.state);
          if (this.state[i] == this.jsonData.state) {
            this.selectedvalue = i;
            console.log(this.selectedvalue);
          }
        }
        if (this.jsonData.dob != null) {
          let arr = this.jsonData.dob.split('T');
          this.dob = arr[0];
        }
        this.photo = this.jsonData.photo;
        this.photoId = this.jsonData.photoId;

        if (this.jsonData.gender == 'Male') {
          this.maleChecked = true;
        } else if (this.jsonData.gender == 'Female') {
          this.femaleChecked = true;
        }

      },
      error => {


        alert('error');
        this.router.navigate(['error']);
        console.log('connection failed!...');
      }
    );
   }


  ngOnInit() {


  }






  checkUserName(value) {
    if (value.length < 6) {
      this.showMessage = true;
    } else {
      this.showMessage = false;
    }
  }

  isReadonly() {
    return true;
  }


  getState(state) {
    this.selectedState = state;
    console.log(this.selectedState);
    console.log('getState');
    if (state == 'Assam' || state == 'Telagana' || state == 'Orissa') {

      this.donotPlay = true;

    } else {

      this.donotPlay = false;

    }
    this.selectedState = state;
  }


  skipProfile(){
    this.router.navigate(['/matchcenter/cricket/1']);
   }


   getGender(gender) {

    this.gender = gender;
    console.log(this.gender)
  }



  changePass() {
    this.router.navigate(['changepassword']);

  }


  hello(){





  }


  updateProfile() {
    console.log(this.selectedState);

    if (this.selectedState == 'Assam' || this.selectedState == 'Telagana' || this.selectedState == 'Orissa') {
      alert('Resident of ' + this.selectedState + ' cannot play cash contest');

    } else {
      if (this.showMessage = false) {
     alert('Username 6 character minimum');

      } else {
        console.log(this.selectedState);
        let bodyData = {
          teamName: this.teamName,
          gender: this.gender,
          address: this.address,
          city: this.city,
          state: this.selectedState,
          pin: this.pin,
          photoId: this.photoId,
          name: this.name,
          userName: this.username,
          dob: this.dob,
        };
        console.log(bodyData);

        this.rest.saveEditProfile(bodyData, this.token).then(
          result => {
            console.log(result);
            alert('sucess');
            if (result['status'] == 1) {
              this.router.navigate(['/matchcenter/cricket/1']);
            }

          },
          error => {
            //console.log(error);

            this.router.navigate(['error']);
            console.log('connection failed!...');
          }
        );
      }
    }
  }





  verifyEmail(){

    this.router.navigate(['/email/this.email']);

  }

  allImages(){

  }



}



// Pending -


// allImages() {}
