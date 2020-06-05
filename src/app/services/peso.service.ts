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
  peso$: Observable<Peso[]>;
  peso: Peso[];
  sub: any;

  constructor(private afs: AngularFirestore) {
    this.peso$ = this.afs.collection<Peso>('peso').valueChanges();

    this.sub = this.afs.collection<Peso>('peso').valueChanges()
    .subscribe(res => this.peso = res);
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
