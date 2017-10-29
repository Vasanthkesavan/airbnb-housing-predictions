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
}
