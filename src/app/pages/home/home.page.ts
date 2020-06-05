import { PesoService } from './../../services/peso.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController, NavParams, IonFab } from '@ionic/angular';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as zoomPlugin from 'chartjs-plugin-zoom';

interface Info {
  data: any;
  kg: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  dataAttuale: Date = new Date();
  infos: Info[] = [];
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
          enabled: false,
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
  showLegend = false;


  constructor(private modalController: ModalController,
              private pesoService: PesoService) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {data: 'new Date()', kg: ''}
    });
    modal.present();
  }


  ngOnInit() {
    this.pesoService.loadPeso().subscribe(data => {
      this.infos = data.map(e => {
        return {
          data: e.payload.doc.data().data,
          kg: e.payload.doc.data().kg
        };
      });
      this.chartLabels = [];
      for (const info of this.infos) {
        this.chartLabels.push(info.data);
        this.chartData[0].data.push(info.kg);
      }
      console.log(this.infos);
    });
  }

}