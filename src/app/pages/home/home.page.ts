import { ConfigService } from './../../services/config.service';
import { LineChartService } from './../../services/line-chart.service';
import { PesoService } from './../../services/peso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PieChartService } from 'src/app/services/pie-chart.service';
import { Info } from '../model/info';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  dataAttuale: Date = new Date();
  infos: Info[] = [];
  sub: Subscription;
  sub2: Subscription;

  constructor(private modalController: ModalController,
              private pesoService: PesoService,
              public lcs: LineChartService,
              public pcs: PieChartService,
              public cfg: ConfigService
              ) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {data: 'new Date()', kg: ''}
    });
    modal.present();
  }

  drawGraf(): void {
    this.sub = this.pesoService.loadPeso().subscribe(data => {
      this.infos = data.map(e => {
        return {
          data: e.payload.doc.data().data,
          kg: e.payload.doc.data().kg,
          massaGrassa: e.payload.doc.data().massaGrassa,
          massaIdrica: e.payload.doc.data().massaIdrica,
          massaMuscolare: e.payload.doc.data().massaMuscolare,
          massaOssea: e.payload.doc.data().massaOssea
        };
      });
      this.infos.sort((a, b) => new Date(a.data) > new Date(b.data) ? 1 : -1);
      this.lcs.chartLabels = [];
      for (const info of this.infos) {
        this.lcs.chartLabels.push(info.data);
        this.lcs.chartData[0].data.push(info.kg);
        this.lcs.chartData[1].data.push(info.massaGrassa);
        this.lcs.chartData[2].data.push(info.massaIdrica);
        this.lcs.chartData[3].data.push(info.massaMuscolare);
        this.lcs.chartData[4].data.push(info.massaOssea);
      }
    });
  }

  drawPieGraf(): void {
    this.sub2 = this.pesoService.loadPeso().subscribe(data => {
      this.infos = data.map(e => {
        return {
          data: e.payload.doc.data().data,
          kg: e.payload.doc.data().kg
        };
      });
      // this.infos.sort((a, b) => new Date(a.data) > new Date(b.data) ? 1 : -1);
      this.pcs.pieChartLabels = [];
      for (const info of this.infos) {
        this.pcs.pieChartLabels.push(info.data);
        this.pcs.pieChartData[0].data.push(info.kg);
      }
    });
  }


  ngOnInit() {
    this.drawGraf();
    this.drawPieGraf();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

}
