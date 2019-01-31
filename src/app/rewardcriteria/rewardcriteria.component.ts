import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../service/services.service';


@Component({
  selector: 'app-rewardcriteria',
  templateUrl: './rewardcriteria.component.html',
  styleUrls: ['./rewardcriteria.component.scss']
})
export class RewardcriteriaComponent implements OnInit {

  token: any;
  jsonData: any = {};
  rewordCritaria: any = [];

  constructor(private router: Router  , private rest:ServicesService  ) { }

  ngOnInit() {

    this.fetchDataFromApi();
  }


  fetchDataFromApi(){
    this.token = 'Bearer ' + localStorage.getItem('putoken');
    this.rest.getProfileData(this.token).then(
      result => {
        this.jsonData = result;

        console.log(this.jsonData);
        if (this.jsonData.status == 1) {

            this.rewordCritaria = this.jsonData.data.rewardCriteria;
            console.log(this.rewordCritaria);
          }
      },
      error => {
        // console.log(error);
        this.router.navigate(['error']);
        console.log('connection failed');
      }
    );
}

}
