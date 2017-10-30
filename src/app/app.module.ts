import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {ServerService} from '../server.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartcontainerComponent } from './chartcontainer/chartcontainer.component';
import { ChartoneComponent } from './chartcontainer/chartone/chartone.component';
import { CharttwoComponent } from './chartcontainer/charttwo/charttwo.component';
import { ChartthreeComponent } from './chartcontainer/chartthree/chartthree.component';
import {MatMenuModule} from '@angular/material';
import {MatGridListModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import {MatToolbarModule} from '@angular/material';
import { PriceEstimaterComponent } from './price-estimater/price-estimater.component';
import {MatInputModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ChartcontainerComponent,
    ChartoneComponent,
    CharttwoComponent,
    ChartthreeComponent,
    PriceEstimaterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    ChartsModule,
    MatToolbarModule,
    MatInputModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
