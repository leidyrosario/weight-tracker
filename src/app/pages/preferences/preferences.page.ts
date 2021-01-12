import { LineChartService } from './../../services/line-chart.service';
import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { distinct, filter, map, toArray } from 'rxjs/operators';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage {


  constructor(public cfg: ConfigService,
              public lcs: LineChartService,
              private router: Router) {}



  gotoHome() {
    this.router.navigate(['home']);
  }


}
