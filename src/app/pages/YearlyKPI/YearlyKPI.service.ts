import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../Service/Service';
import { KpiYearlyModel,DeptNameModel } from './YearlyKPI.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YearlyKPIService {
  constructor(private http: HttpClient, private service: Service) { }
  public url = this.service.url;
  public httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  
  getDeptName(): Observable<DeptNameModel[]> {
    return this.http.get<DeptNameModel[]>(this.url + 'KPI/getDeptName');
  }
  getAllKpi(): Observable<KpiYearlyModel[]> {
    return this.http.get<KpiYearlyModel[]>(this.url + 'KPI/getAllkpi');
  }

 
}
