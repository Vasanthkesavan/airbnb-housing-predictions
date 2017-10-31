import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHide: boolean;
  showPrice: boolean;
  showBooking: boolean;

  constructor() {
    this.showHide = false;
    this.showPrice = false;
    this.showBooking = false;
  }

  changeShowStatus() {
    if(this.showHide === false) {
      this.showHide = !this.showHide;
    };

    if(this.showBooking) {
      this.showBooking = !this.showBooking;
    };

    if(this.showPrice) {
      this.showPrice = !this.showPrice;
    };
  }

  changeShowStatusForPrice() {
    if(this.showPrice === false) {
      this.showPrice = !this.showPrice;
    };

    if(this.showHide) {
      this.showHide = !this.showHide;
    };

    if(this.showBooking) {
      this.showBooking = !this.showBooking;
    };
  }

  changeShowStatusForBooking() {
    if(this.showBooking === false) {
      this.showBooking = !this.showBooking;
    };

    if(this.showPrice) {
      this.showPrice = !this.showPrice;
    };

    if(this.showHide) {
      this.showHide = !this.showHide;
    };
  }
}
