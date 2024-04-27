import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PeriodDTO } from '../models/period.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  api = environment.baseUrl + 'periodo/';
  constructor(private http:HttpClient) { }

  list(): Observable<PeriodDTO[]> {
    return this.http.get<PeriodDTO[]>(this.api);
  }

  searchCodePeriod(codePeriod: string): Observable<any> {
    return this.http.get<any>(this.api + 'searchcodeperiod/' + codePeriod);
  }

  save(post: PeriodDTO): Observable<PeriodDTO> {
    return this.http.post<PeriodDTO>(this.api, post);
  }
  
  update(put: PeriodDTO): Observable<PeriodDTO> {
    return this.http.put<PeriodDTO>(this.api, put);
  }

  delete(destroy: PeriodDTO): Observable<PeriodDTO> {
    return this.http.put<PeriodDTO>(this.api + 'delete', destroy);
  }
}
