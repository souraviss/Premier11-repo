import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { Router, ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navLinks:any;
  token: any;
  responsesportstypedata: any;
  store = [];
  matchname: any;

  constructor(  private rest : ServicesService , public router : Router  , public _route: ActivatedRoute ) {
    console.log(location.pathname);

    this.loadDataFromApi();
  }

  ngOnInit() {

    // const id = +this._route.snapshot.paramMap.get();
}

logout(){
  debugger;
  localStorage.removeItem('putoken');
  this.router.navigate(['']);
}

  getMatchid(val ,name){

    console.log('header >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(name);
    this.matchname = val
    console.log('val ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ' +     this.matchname);
    console.log(this.matchname);
    this.router.navigate(['/matchcenter',name , val]);
    console.log(this.router.navigate);
    console.log(typeof(val));

  }


  loadDataFromApi() {
     this.token =  localStorage.getItem('putoken');
      console.log('token == ' + this.token);
     this.rest.getSportstype().then(
      result => {
       this.responsesportstypedata = result;
       this.store = this.responsesportstypedata;
       console.log(this.store);


       },
      err => {


        this.router.navigate(['ErrorPage']);

      }
    );

  }




}
