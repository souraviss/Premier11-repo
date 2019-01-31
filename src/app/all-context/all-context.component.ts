import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../service/services.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-all-context',
  templateUrl: './all-context.component.html',
  styleUrls: ['./all-context.component.scss']
})
export class AllContextComponent implements OnInit {
  // contexts:any[];

  listAllContext:any[]=[];
  matchId:string;
  sportsType:any;
  responseData:any;
  constructor(private _route : ActivatedRoute,public restapi: ServicesService,private router:Router ) { }

  ngOnInit() {
    this.GetAllContextData();

  }


  private GetAllContextData() {
    debugger;
    let token = 'Bearer ' + localStorage.getItem('putoken');
    this._route.paramMap.subscribe(params => {
      this.matchId = params.get('matchId');
     // localStorage.setItem('matchId', this.matchId);
      //console.log(this.matchId);
    });

    this.sportsType=parseInt(localStorage.getItem('ssSportType'));
    this.restapi.AllContextByMatchId(token, this.matchId).then(result => {
      debugger;
      this.responseData = result;
      //this.listAllContext.push(this.responseData.data.icm.contests);
      console.log(this.responseData.data.icm);
      // this.contexts=this.responseData.data.icm;
      for (const key in this.responseData.data.icm) {
        if (this.responseData.data.icm.hasOwnProperty(key)) {
          const element = this.responseData.data.icm[key];
          //this.listAllContext=element;
          for (const key1 in element.contests) {
            if (element.contests.hasOwnProperty(key1)) {
              const elementref = element.contests[key1];
              //console.log(elementref.totalTeams);
              this.listAllContext.push(elementref);
              console.log(this.listAllContext);
            }
          }
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
    }, err => {
      //console.log(err);
      this.router.navigate(['error']);
      console.log('connection failed!...');
    });
  }
}
