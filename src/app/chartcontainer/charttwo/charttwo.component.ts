import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../../server.service';

@Component({
  selector: 'app-charttwo',
  templateUrl: './charttwo.component.html',
  styleUrls: ['./charttwo.component.css']
})
export class CharttwoComponent implements OnInit {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartData:any[] = [{data: [0], label: 'With Fee'}, {data: [0], label: 'Without Fee'}];
  public barChartLabels:string[] = ['House Cleaning Fee'];

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getChartTwoData()
      .subscribe(
        (response) => {
          this.chartData = JSON.parse(response.text())
        },
        (error) => {
          console.error(error);
        }
      );
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
