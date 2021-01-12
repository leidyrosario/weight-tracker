import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Info } from '../pages/model/info';
import { Peso } from '../pages/model/peso';

@Injectable({
  providedIn: 'root'
})
export class PesoService {
  dataAttuale: Date = new Date();
  infos: Info[] = [];


  constructor(private afs: AngularFirestore,
              private cfg: ConfigService) {}

  addPeso(form: NgForm) {
    const data = form.value.data;
    const kg = form.value.kg;
    const massaGrassa = form.value['Massa Grassa'];
    const massaMuscolare = form.value['Massa Muscolare'];
    const massaOssea = form.value['Massa Ossea'];
    const massaIdrica = form.value['Massa Idrica'];
    // const {data, kg, massaGrassa} = form.value;
    const formRequest = {data, kg, massaGrassa, massaMuscolare, massaOssea, massaIdrica};
    this.infos.push(form.value as Info);
    this.afs.collection<Peso>('peso').add(formRequest);
 }

  loadPeso() {
    return this.afs.collection<Peso>('peso').snapshotChanges();
 }

  loadPiePeso() {
    return this.afs.collection<Peso>('peso').get();
 }

  updatePeso() {

  }

  deletePeso() {

  }

}
