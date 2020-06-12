import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {
  chartData: ChartDataSets[] = [{ data: [], label: 'Peso'}];
  chartLabels: Label[];
  lineChartPlugins = [zoomPlugin];

  // Options
  chartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' },
        type: 'time',
                time: {
                    unit: 'day',
                    displayFormats: {
                        day: 'D'
                    }
                }
      }],
      yAxes: [{
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      }]
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
  chartsColors: Color[] = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  chartType = 'line';
  showLegend = true;


  constructor() { }


}
