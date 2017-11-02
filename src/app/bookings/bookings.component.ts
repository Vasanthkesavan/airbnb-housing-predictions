import { Component, OnInit } from '@angular/core';
import {ServerService} from '../../server.service'

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  value: any;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
  }

  recieveGeoLocation(Lat: Number, Long: Number) {
    this.serverService.makeBookingOptimizations([Lat, Long])
      .subscribe(
        (response) => {
          this.value = response.text();
        },
        (error) => console.log(error)
      );
  }
}
