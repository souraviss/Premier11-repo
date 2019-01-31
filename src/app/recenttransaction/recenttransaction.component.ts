import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-recenttransaction',
  templateUrl: './recenttransaction.component.html',
  styleUrls: ['./recenttransaction.component.scss']
})
export class RecenttransactionComponent implements OnInit {


  token: any;
  date: any;
  information: any;
  displayFlag: boolean = false;

  constructor( private rest : ServicesService , private router: Router) {



   }

  ngOnInit() {
    this.token = 'Bearer ' + localStorage.getItem('putoken');
        console.log('token == ' + this.token);
        console.log(this.token);
        this.rest.myTransaction(this.token).then(
          result => {
             console.log(result);
            this.information = result['data'];
             console.log(this.information);
            this.date = this.information.tranDoe;
            console.log(this.date);

            // let date = new Date(this.information.tranDoe);
            // let arr = date.split('GMT');
          },
          error => {
            // console.log(error);
            this.router.navigate(['error']);
            console.log('connection failed');
          }
        );
      }


      displayDetails(){
        alert('hello');
        this.displayFlag = !this.displayFlag
      }

}
