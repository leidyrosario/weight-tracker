import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

interface Info {
  data: any;
  kg: number;
}

export interface Peso {
  data?: any;
  kg?: number;
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
    const {data, kg} = form.value;
    const formRequest = {data, kg};
    console.log(form);
    this.infos.push(form.value as Info);
    this.afs.collection<Peso>('peso').add(formRequest);
 }

  loadPeso() {
    return this.afs.collection<Peso>('peso').snapshotChanges();
 }

  updatePeso() {

  }

  deletePeso() {

  }

}
