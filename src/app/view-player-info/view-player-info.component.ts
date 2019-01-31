import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../service/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-player-info',
  templateUrl: './view-player-info.component.html',
  styleUrls: ['./view-player-info.component.scss']
})
export class ViewPlayerInfoComponent implements OnInit {
PlayerInfos:any[]=[];
  token: string;
  matchId: string;
  playerType: Number;
  responseData:any;
  CurrentTeam:any[];
  PreviousTeam:any[];
  CurrentTeamCount:Number;
  previousTeamCount:Number;
  constructor(private restapi: ServicesService , private _route : ActivatedRoute) { }

  ngOnInit() {
    this.ViewPlayerList();
  }

  ViewPlayerList(){
   debugger;
   this.token = 'Bearer '+ localStorage.getItem('putoken');

   this._route.paramMap.subscribe(params => {
    this.matchId = params.get('matchId');
    localStorage.setItem('matchId', this.matchId);
    this.playerType=parseInt(params.get('PlayerType'));
    //console.log(this.matchId);
  });

  this.restapi.ViewTeamSelection(this.token,this.matchId,this.playerType).then(
    result => {
      debugger;
      
       this.responseData=result;
       this.CurrentTeam= this.responseData.data.cteam;
       this.PreviousTeam=this.responseData.data.pteam;
       this.CurrentTeamCount=this.responseData.data.cteam.length;
       this.previousTeamCount=this.responseData.data.pteam.length;
    }
  )

  }

}
