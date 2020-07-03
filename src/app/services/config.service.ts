import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
activeGraf: 'pie'|'line'|'all' = 'line';

}
