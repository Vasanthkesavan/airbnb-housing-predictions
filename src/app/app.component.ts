import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showHide: boolean;

  constructor() {
    this.showHide = false;
  }

  changeShowStatus() {
    this.showHide = !this.showHide;
  }

  changeShowStatusForPrice() {
    if(this.showHide === true) {
      this.changeShowStatus();
    };
  }
}
