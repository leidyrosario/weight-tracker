import { PesoService } from './../../services/peso.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

interface Info {
  data: any;
  kg: number;
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  dataAttuale: Date = new Date();
  infos: Info[] = [];



  constructor(
    private modalController: ModalController,
    private pesoService: PesoService) {}

  ngOnInit() {
    this.pesoService.loadPeso().subscribe(data => {
      this.infos = data.map(e => {
        return {
          data: e.payload.doc.data().data,
          kg: e.payload.doc.data().kg
        };
      });
      console.log(this.infos);
    });
  }

  add(form: NgForm) {
    this.infos.push(form.value as Info);
    this.pesoService.addPeso(form);
    this.modalController.dismiss({
    });
 }

  cambioData(event) {
    console.log ('ionChange', event);
  }

  cambioOra(event) {
    console.log ('ionChange', event);
  }

  closeModal() {
    this.modalController.dismiss({
    });
  }
}
