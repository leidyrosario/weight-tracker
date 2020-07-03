import { ConfigService } from './../../services/config.service';
import { LineChartService } from './../../services/line-chart.service';
import { PesoService } from './../../services/peso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController, NavParams, IonFab } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PieChartService } from 'src/app/services/pie-chart.service';

interface Info {
  data: any;
  kg: number;
}

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
          kg: e.payload.doc.data().kg
        };
      });
      this.infos.sort((a, b) => new Date(a.data) > new Date(b.data) ? 1 : -1);
      this.lcs.chartLabels = [];
      for (const info of this.infos) {
        this.lcs.chartLabels.push(info.data);
        this.lcs.chartData[0].data.push(info.kg);
      }
      console.log(this.infos);
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
      this.infos.sort((a, b) => new Date(a.data) > new Date(b.data) ? 1 : -1);
      this.pcs.pieChartLabels = [];
      for (const info of this.infos) {
        this.pcs.pieChartLabels.push(info.data);
        this.pcs.pieChartData[0].data.push(info.kg);
      }
      console.log(this.infos);
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
