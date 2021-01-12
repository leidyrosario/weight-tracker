import { PesoService } from './peso.service';
import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  pieChartData: ChartDataSets[] = [{ data: [], label: 'Peso'}];
  pieChartLabels: Label[] = [];
  pieChartPlugins = [pluginDataLabels];

  // Options
  pieChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
  }
  };

  pieChartsColors: Color[] = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  pieChartType = 'pie';
  pieShowLegend = true;


  constructor(private pesoService: PesoService) {
    this.pesoService.loadPiePeso();
   }
}
