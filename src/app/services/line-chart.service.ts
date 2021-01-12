import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {
  chartData: ChartDataSets[] = [
    { data: [], label: 'Peso'},
    { data: [], label: 'Massa Grassa', yAxisID: 'y-axis-1'},
    { data: [], label: 'Massa Idrica', yAxisID: 'y-axis-1'},
    { data: [], label: 'Massa Muscolare', yAxisID: 'y-axis-1'},
    { data: [], label: 'Massa Ossea', yAxisID: 'y-axis-1'},
  ];
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
      yAxes: [
        {
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
    ]
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
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // green
      backgroundColor: 'rgba(56, 204, 59, 0.5)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // blue
      backgroundColor: 'rgba(0, 26, 194, 0.5)',
      borderColor: 'rgba(0, 26, 194, 1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  chartType = 'line';
  showLegend = true;


  constructor() { }


}
