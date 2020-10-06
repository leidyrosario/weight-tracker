import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
activeGraf: 'pie'|'line'|'all' = 'line';

addParam: 'massa grassa'|'massa muscolare'|'massa ossea'| 'massa idrica' = null;




}
