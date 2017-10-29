import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../../server.service';

@Component({
  selector: 'app-charttwo',
  templateUrl: './charttwo.component.html',
  styleUrls: ['./charttwo.component.css']
})
export class CharttwoComponent implements OnInit {


  constructor(private serverService: ServerService) { }

  ngOnInit() {

  }


}
