import { Injectable, OnInit } from '@angular/core';

export interface Parametro {
  parametro: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  activeGraf: 'pie'|'line'|'all' = 'line';
  selected: string[];
  selectedArray: Parametro[] = [];

  list: Parametro[] = [
    {parametro: 'Massa Grassa'},
    {parametro: 'Massa Muscolare'},
    {parametro: 'Massa Ossea'},
    {parametro: 'Massa Idrica'}
  ];

  addOption() {
    // this.selectedArray.push(this.selected);
    this.selectedArray = this.selected.map(item => ({parametro: item}));
    console.log(this.selected);
  }










}
