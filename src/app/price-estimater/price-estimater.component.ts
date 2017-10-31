import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../server.service'

@Component({
  selector: 'app-price-estimater',
  templateUrl: './price-estimater.component.html',
  styleUrls: ['./price-estimater.component.css']
})
export class PriceEstimaterComponent implements OnInit {
  value: any;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  recieveGeoLocation(Lat: Number, Long: Number) {
    this.serverService.makePriceOptimization([Lat, Long])
      .subscribe(
        (response) => {
            this.value = response.text();
        },
        (error) => console.log(error)
      );
  }
}
