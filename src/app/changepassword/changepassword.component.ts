import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';



@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  oldPassword : any;
  newPassword : any;
  confirmPassword : any;
  token : any;
  jsonData: any;

  constructor(private restapi: ServicesService , private router : Router) { }

  ngOnInit() {
  }


  changePassword(){
   if( this.oldPassword != '' && this.confirmPassword != '' && this.newPassword != '' ){
     if( this.confirmPassword === this.newPassword ) {
      let passwordDetails = {
        'oldPassword' : this.oldPassword,
        'newPassword' :  this.newPassword,
        'confirmPassword' :  this.confirmPassword,
         }


         this.token = 'Bearer ' + localStorage.getItem('putoken');

         this.restapi.changePassword( passwordDetails , this.token).then(
           result => {
            this.jsonData = result;


            console.log(this.jsonData);
            if(this.jsonData.status == 1){

              alert('your password has been changes');

            }else{
              alert('you need to check your old password !');
            }

           },
           err => {

            this.router.navigate(['error']);
            console.log('connection Failed');
          }
         )

     }else {
       alert('please confirm your password with new password again');
     }
    } else {
      alert('please fill all the given fields');
    }
  }


  back(){

    this.router.navigate(['profile']);

  }

}
