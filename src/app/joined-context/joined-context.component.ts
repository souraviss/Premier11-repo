import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-joined-context',
  templateUrl: './joined-context.component.html',
  styleUrls: ['./joined-context.component.scss']
})
export class JoinedContextComponent implements OnInit {
  listAllContext:any[]=[];
  matchId:string;
  sportType:any;
  responseData:any={};
  constructor(private _route : ActivatedRoute,public restapi: ServicesService,private router:Router) { }

  ngOnInit() {
    debugger;
    let token ='Bearer '+localStorage.getItem('putoken');

    

    this._route.paramMap.subscribe(params => {  this.matchId  = params.get('matchId')
        localStorage.setItem('matchId',this.matchId);
       //console.log(this.matchId);
      })
this.sportType=parseInt(localStorage.getItem('ssSportType'));
      this.restapi.AllUserContextByMatchId(token,this.matchId).then(
        result => {
          debugger;
          this.responseData = result;
          //this.listAllContext.push(this.responseData.data.icm.contests);
           console.log(this.responseData.data);
          // this.contexts=this.responseData.data.icm;
           for (const key in this.responseData.data) {
             if (this.responseData.data.hasOwnProperty(key)) {
               const element = this.responseData.data[key];
               console.log(element.contest);
               this.listAllContext.push(element.contest);
               //this.listAllContext=element;
              //  for (const key1 in element.contests) {
              //    if (element.contests.hasOwnProperty(key1)) {
              //      const elementref = element.contests[key1];
              //      //console.log(elementref.totalTeams);
              //      this.listAllContext.push(elementref);
              //      console.log(this.listAllContext);
              //    }
              //  }
               //this.listAllContext.push(element.contests);
              //  for (const key in element) {
              //    if (element.hasOwnProperty(key)) {
              //      const eleContext = element[key];
              //     // this.listAllContext.push(eleContext);
              //    }
               }
              //  console.log(element.contests);
              //  this.listAllContext.push(element.contests);
             }
           }
        ,
        err => {
          //console.log(err);
          this.router.navigate(['error']);
          console.log('connection failed!...');
  
        }
      );
  }

}
