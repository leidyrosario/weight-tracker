import { LineChartService } from './../../services/line-chart.service';
import { PesoService } from './../../services/peso.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { ModalController, NavParams, IonFab } from '@ionic/angular';
import { Subscription } from 'rxjs';

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

  constructor(private modalController: ModalController,
              private pesoService: PesoService,
              public lcs: LineChartService) {}

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


  ngOnInit() {
    this.drawGraf();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
