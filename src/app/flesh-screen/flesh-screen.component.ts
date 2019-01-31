import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { flatten } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-flesh-screen',
  templateUrl: './flesh-screen.component.html',
  styleUrls: ['./flesh-screen.component.scss']
})
export class FleshScreenComponent implements OnInit {
loginButton:boolean=false;
registerButton:boolean=false;
  constructor(public dialog: MatDialog  , public router: Router) {
     
    let token=localStorage.getItem('putoken');
    // console.log(token);
    // if(token)
    // {
     
    //   console.log(token);
    //   this.router.navigate(['/matchcenter/cricket/1']);
    // }

    
    if(token)
    {
      this.loginButton=true;
      this.registerButton=true;
      // this.router.navigate(['/matchcenter/cricket/1']);
      // this.dialogRef.close();
    }
    else
    {

    }

  }

  ngOnInit() {
  //  console.log( 'get localstorage '  + localStorage.getItem('user'));

  //  if(localStorage.getItem('user')){

  //   this.router.navigate(['/matchcenter/cricket/1']);
  //  }else {
  // alert('else');
  //  }

  }

  login(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '750px',
      height: '600px',
    });
  }

  register(){
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '750px',
      height: '600px',
    });
  }
}
