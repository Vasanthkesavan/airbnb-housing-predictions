import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class ServerService {
  constructor(private http: Http) {}

  getChartOneData() {
    return this.http.get('/api/hostVerification');
  }

  getChartTwoData() {
    return this.http.get('/api/getCleaningFee');
  }

  getChartThreeData() {
    return this.http.get('/api/numberReviews');
  }

  makePriceOptimization(geoLocation: any[]) {
    return this.http.post('/api/priceOptimize', geoLocation);
  }

  makeBookingOptimizations(geoLocation: any[]) {
    return this.http.post('api/bookingOptimize', geoLocation);
  }
}
