import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../../server.service";

@Component({
  selector: 'app-chartthree',
  templateUrl: './chartthree.component.html',
  styleUrls: ['./chartthree.component.css']
})
export class ChartthreeComponent implements OnInit {
  // PolarArea
  public polarAreaChartLabels:string[] = ['Between 0 - 10', 'Greater than 20'];
  public polarAreaChartData:number[] = [0, 0];
  public polarAreaLegend:boolean = true;

  public polarAreaChartType:string = 'polarArea';
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getChartThreeData()
      .subscribe(
        (response) => {
          this.polarAreaChartData = JSON.parse(response.text())
        },
        (error) => {
          console.error(error);
        }
      )
  }



  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
