import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

interface Info {
  data: any;
  kg: number;
  massaGrassa?: number;
  massaMuscolare?: number;
  massaOssea ?: number;
  massaIdrica?: number;
}

export interface Peso {
  data?: any;
  kg?: number;
  massaGrassa?: number;
  massaMuscolare?: number;
  massaOssea?: number;
  massaIdrica?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PesoService {
  dataAttuale: Date = new Date();
  infos: Info[] = [];


  constructor(private afs: AngularFirestore) {

   }



   addPeso(form: NgForm) {
    const {data, kg, massaGrassa, massaMuscolare, massaOssea, massaIdrica} = form.value;
    const formRequest = {data, kg, massaGrassa, massaMuscolare, massaOssea, massaIdrica};
    console.log(form);
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
