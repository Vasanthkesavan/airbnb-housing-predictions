import {Component, OnInit} from '@angular/core';
import {ServerService} from '../../../server.service';

@Component({
  selector: 'app-chartone',
  templateUrl: './chartone.component.html',
  styleUrls: ['./chartone.component.css']
})
export class ChartoneComponent implements OnInit {

  constructor(private serverService: ServerService) {}

  // Doughnut
  public doughnutChartLabels:string[] = ['Verified Host', 'Unverified Host', 'All Others'];
  public doughnutChartData:number[] = [0, 0, 0];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartOptions:any = {
    responsive: true
  }


  ngOnInit() {
    this.serverService.getChartOneData()
      .subscribe(
        (response) => {
          this.doughnutChartData = JSON.parse(response.text());
        },
        (error) => console.error(error)
      );
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
