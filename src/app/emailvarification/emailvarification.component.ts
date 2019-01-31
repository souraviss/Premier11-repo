import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emailvarification',
  templateUrl: './emailvarification.component.html',
  styleUrls: ['./emailvarification.component.scss']
})
export class EmailvarificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  submit(){
    alert('hello');
  }

}
