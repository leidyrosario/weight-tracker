import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  pieChartData: ChartDataSets[] = [{ data: [], label: 'Peso'}];
  pieChartLabels: Label[];
  pieChartPlugins = [zoomPlugin];

  // Options
  pieChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          enabled: false,
          mode: 'xy'
    }
  }
  }
  };

  pieChartsColors: Color[] = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  chartType = 'pie';
  showLegend = true;

  constructor() { }
}
